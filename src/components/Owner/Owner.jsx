import React from 'react';
import { useTranslation } from 'react-i18next';
import './Owner.css';

function Owner({ name }) {
    const { t } = useTranslation();

    return (
        <div className="owner">
            <span className="owner-label">{t("List owned by:")}</span> {name}
        </div>
    );
}

export default Owner;