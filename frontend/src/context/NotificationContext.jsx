import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notificationCount, setNotificationCount] = useState(0);


    // =====================================================
    // LOAD NOTIFICATION COUNT
    // =====================================================

    const loadNotificationCount = async () => {

        try {

            const userId = localStorage.getItem("userId");

            // IMPORTANT:
            // undefined / null / empty ID par API call mat karo
            if (!userId || userId === "undefined" || userId === "null") {

                console.log(
                    "Notification count skipped - User ID not found"
                );

                setNotificationCount(0);

                return;
            }


            console.log(
                "Loading notification count for user:",
                userId
            );


            const response = await api.get(
                `/notifications/user/${userId}/unread-count`
            );


            setNotificationCount(response.data);

        } catch (error) {

            console.error(
                "Error loading notification count:",
                error
            );

            setNotificationCount(0);
        }
    };


    // =====================================================
    // LOAD COUNT WHEN USER LOGS IN
    // =====================================================

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        if (
            userId &&
            userId !== "undefined" &&
            userId !== "null"
        ) {
            loadNotificationCount();
        }

    }, []);


    return (
        <NotificationContext.Provider
            value={{
                notificationCount,
                loadNotificationCount
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};


// =====================================================
// CUSTOM HOOK
// =====================================================

export const useNotifications = () => {

    return useContext(NotificationContext);

};