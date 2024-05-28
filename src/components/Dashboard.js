import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ campaigns }) => {
    return (
        <div className="dashboard">
            {campaigns.map((campaign, index) => (
                <Link to={`/CampaignDetails/${index}`} key={index} className="campaign-link">
                    <div className="campaign-card" key={index}>
                        <img src={campaign.imageUrl} alt={campaign.title} className="campaign-image" />
                        <div className="campaign-info">
                            <h3>{campaign.title}</h3>
                            <p><strong>Creator:</strong> {campaign.creator}</p>
                            <p>{campaign.description}</p>
                            <p><strong>Goal:</strong> ${campaign.goal}</p>
                            <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Dashboard;
