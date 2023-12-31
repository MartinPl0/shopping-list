import React from 'react';
import { useTranslation } from 'react-i18next';
import './MembersSection.css';
import AddMemberButton from '../AddMemberButton/AddMemberButton';

function MembersSection({ members, isOwner, onRemoveMember, onAddMember, currentUser, allUsers }) {
    const { t } = useTranslation();

    return (
        <div className="members-section">
            <h3>{t("Members")}</h3>
            <ul className="members-list">
                {members.map((member) => (
                    <li key={member.id} className="member-item">
                        {member.name}
                        {member.id === currentUser.id ? (
                            <button
                                className="leave-list-button"
                                onClick={() => onRemoveMember(member.id)}
                            >
                                {t("Leave List")}
                            </button>
                        ) : (
                            isOwner && (
                                <button
                                    className="remove-member-button"
                                    onClick={() => onRemoveMember(member.id)}
                                >
                                    {t("Remove")}
                                </button>
                            )
                        )}
                    </li>
                ))}
                {isOwner && (
                <AddMemberButton onAdd={onAddMember} allUsers={allUsers} />
                )}
            </ul>
        </div>
    );
}

export default MembersSection;
