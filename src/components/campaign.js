import React, { useState } from 'react';
import { ethers , parseUnits} from 'ethers';

const CampaignForm = ({ campaigns, updateCampaigns, state }) => {
    const [formData, setFormData] = useState({
        creator: '',
        title: '',
        description: '',
        goal: '',
        amountRaised: 200,
        endDate: '',
        imageUrl: '',
        donators: [
            { name: 'Donator 1', amount: 50 },
            { name: 'Donator 2', amount: 150 },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const tx = await state.contract.createCampaign(
                formData.creator,
                formData.title,
                formData.description,
                parseUnits(formData.goal, 'ether'),
                new Date(formData.endDate).getTime() / 1000,
                formData.imageUrl
            );
            await tx.wait();
            updateCampaigns([...campaigns, formData]);
            setFormData({
                creator: '',
                title: '',
                description: '',
                goal: '',
                amountRaised: 200,
                endDate: '',
                imageUrl: '',
                donators: [
                    { name: 'Donator 1', amount: 50 },
                    { name: 'Donator 2', amount: 150 },
                ],
            });
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    return (
        <div className="campaign-form-container">
            <form className="campaign-form" onSubmit={handleSubmit}>
                <h2>Create Campaign</h2>
                <label>
                    Campaign Creator Name:
                    <input
                        type="text"
                        name="creator"
                        value={formData.creator}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Campaign Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Goal:
                    <input
                        type="number"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Campaign Image URL:
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Create Campaign</button>
            </form>
            {formData && (
                <div className="campaign-preview">
                    <h2>Campaign Preview</h2>
                    <p><strong>Creator:</strong> {formData.creator}</p>
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Goal:</strong> ${formData.goal}</p>
                    <p><strong>End Date:</strong> {formData.endDate}</p>
                    <img src={formData.imageUrl} alt={formData.title} />
                </div>
            )}
        </div>
    );
};

export default CampaignForm;
