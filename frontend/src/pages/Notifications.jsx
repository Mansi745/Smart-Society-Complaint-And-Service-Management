import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./Notifications.css";
import { useNotifications } from "../context/NotificationContext";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const { loadNotificationCount } = useNotifications();


    // =====================================================
    // NOTIFICATION ICON
    // =====================================================

    const getNotificationIcon = (type) => {

        switch (type?.toUpperCase()) {

            case "COMPLAINT":
                return "⚠️";

            case "NEW_COMPLAINT":
                return "📋";

            case "COMPLAINT_ASSIGNED":
                return "📌";

            case "WORK_ASSIGNED":
                return "🛠️";

            case "STAFF_REGISTERED":
                return "👨‍🔧";

            case "PAYMENT":
                return "💰";

            case "ANNOUNCEMENT":
                return "📢";

            case "MAINTENANCE":
                return "🔧";

            case "SECURITY":
                return "🔐";

            case "EVENT":
                return "📅";

            default:
                return "🔔";
        }
    };


    // =====================================================
    // LOAD NOTIFICATIONS
    // =====================================================

    const loadNotifications = async () => {

        try {

            const userId =
                localStorage.getItem("userId");

            if (!userId) {

                console.error(
                    "User ID not found in localStorage"
                );

                return;
            }


            console.log(
                "Loading notifications for User ID:",
                userId
            );


            const response =
                await api.get(
                    `/notifications/user/${userId}`
                );


            console.log(
                "Notifications received:",
                response.data
            );


            setNotifications(response.data);

        } catch (error) {

            console.error(
                "Error loading notifications:",
                error
            );
        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadNotifications();

        loadNotificationCount();

    }, []);


    // =====================================================
    // MARK AS READ
    // =====================================================

    const markAsRead = async (id) => {

        try {

            await api.put(
                `/notifications/${id}/read`
            );


            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === id
                        ? {
                            ...notification,
                            read: true
                        }
                        : notification
                )
            );


            await loadNotificationCount();

        } catch (error) {

            console.error(
                "Error marking notification as read:",
                error
            );
        }
    };


    // =====================================================
    // DELETE NOTIFICATION
    // =====================================================

    const deleteNotification = async (id) => {

        try {

            await api.delete(
                `/notifications/${id}`
            );


            setNotifications((prev) =>
                prev.filter(
                    (notification) =>
                        notification.id !== id
                )
            );


            await loadNotificationCount();

        } catch (error) {

            console.error(
                "Error deleting notification:",
                error
            );
        }
    };


    // =====================================================
    // UNREAD COUNT
    // =====================================================

    const unreadCount =
        notifications.filter(
            (notification) =>
                !notification.read
        ).length;


    // =====================================================
    // UI
    // =====================================================

    return (

        <Layout>

            <div className="notifications-page">

                {/* ============================= */}
                {/* HEADER */}
                {/* ============================= */}

                <div className="notifications-header">

                    <div>

                        <h1>
                            Notifications
                        </h1>

                        <p>
                            Stay updated with your
                            society activities
                        </p>

                    </div>


                    <span className="notification-count">

                        {unreadCount} Unread

                    </span>

                </div>


                {/* ============================= */}
                {/* EMPTY STATE */}
                {/* ============================= */}

                {notifications.length === 0 ? (

                    <div className="no-notifications">

                        <h3>
                            No notifications available
                        </h3>

                        <p>
                            You are all caught up!
                        </p>

                    </div>

                ) : (

                    <div className="notification-list">

                        {notifications.map(
                            (notification) => (

                                <div
                                    className={`notification-card ${
                                        notification.read
                                            ? "read"
                                            : "unread"
                                    }`}
                                    key={notification.id}
                                >

                                    {/* ============================= */}
                                    {/* CONTENT */}
                                    {/* ============================= */}

                                    <div className="notification-content">

                                        <div
                                            className={`notification-icon ${notification.type?.toLowerCase()}`}
                                        >

                                            {getNotificationIcon(
                                                notification.type
                                            )}

                                        </div>


                                        <div>

                                            <h3>
                                                {notification.title}
                                            </h3>

                                            <p>
                                                {notification.message}
                                            </p>

                                            <small>
                                                {notification.type}
                                            </small>

                                        </div>

                                    </div>


                                    {/* ============================= */}
                                    {/* ACTIONS */}
                                    {/* ============================= */}

                                    <div className="notification-actions">

                                        {!notification.read && (

                                            <button
                                                className="notification-read"
                                                onClick={() =>
                                                    markAsRead(
                                                        notification.id
                                                    )
                                                }
                                            >
                                                ✓ Mark as Read
                                            </button>

                                        )}


                                        <button
                                            className="notification-delete"
                                            onClick={() =>
                                                deleteNotification(
                                                    notification.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </Layout>
    );
}

export default Notifications;