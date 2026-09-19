package com.smartsociety.smart_society_portal.dto;

public class DashboardResponse {

    private long totalComplaints;
    private long pendingComplaints;
    private long resolvedComplaints;
    private long totalResidents;
    private long inProgressComplaints;

   

	public DashboardResponse() {
    }

    public DashboardResponse(long totalComplaints,
                             long pendingComplaints,
                             long resolvedComplaints,
                             long inProgressComplaints,
                             long totalResidents) {

        this.totalComplaints = totalComplaints;
        this.pendingComplaints = pendingComplaints;
        this.inProgressComplaints = inProgressComplaints;
        this.resolvedComplaints = resolvedComplaints;
        this.totalResidents = totalResidents;
    }

    public long getTotalComplaints() {
        return totalComplaints;
    }

    public void setTotalComplaints(long totalComplaints) {
        this.totalComplaints = totalComplaints;
    }

    public long getPendingComplaints() {
        return pendingComplaints;
    }

    public void setPendingComplaints(long pendingComplaints) {
        this.pendingComplaints = pendingComplaints;
    }

    
    public long getInProgressComplaints() {
		return inProgressComplaints;
	}

	public void setInProgressComplaints(long inProgressComplaints) {
		this.inProgressComplaints = inProgressComplaints;
	}
	
    public long getResolvedComplaints() {
        return resolvedComplaints;
    }

    public void setResolvedComplaints(long resolvedComplaints) {
        this.resolvedComplaints = resolvedComplaints;
    }

    public long getTotalResidents() {
        return totalResidents;
    }

    public void setTotalResidents(long totalResidents) {
        this.totalResidents = totalResidents;
    }
}