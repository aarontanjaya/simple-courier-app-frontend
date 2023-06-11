import React from 'react';
import ProfileAvatar from '../components/ProfileAvatar/ProfileAvatar';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import styles from './Profile.module.scss';
export default function Profile() {
  return (
    <div className={`${styles.container}`}>
      <ProfileAvatar className={`${styles.avatar}`} />
      <ProfileContent className={`${styles.content}`} />
    </div>
  );
}
