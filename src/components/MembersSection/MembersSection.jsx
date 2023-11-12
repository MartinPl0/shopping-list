import React from 'react';
import './MembersSection.css';
import AddMemberButton from '../AddMemberButton/AddMemberButton';

function MembersSection({ members, isOwner, onRemoveMember, onAddMember, currentUser }) {
    return (
        <div className="members-section">
            <h3>Members</h3>
            <ul className="members-list">
                {members.map((member) => (
                    <li key={member.id} className="member-item">
                        {member.name}
                        {isOwner ? (
                            <button
                                className="remove-member-button"
                                onClick={() => onRemoveMember(member.id)}
                            >
                                Remove
                            </button>
                        ) : (
                            member.id === currentUser.id && (
                                <button
                                className="leave-list-button"
                                onClick={() => onRemoveMember(member.id)}
                                >
                                Leave List
                                </button>
                            )
                        )}
                    </li>
                ))}
                {isOwner && (
                    <AddMemberButton onAdd={onAddMember} />
                )}
            </ul>
        </div>
    );
}

export default MembersSection;
