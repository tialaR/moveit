import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallend.module.css'

export function CompletedChallend() {
    const { challengesCompleted } = useContext(ChallengesContext);

    return(
        <div className={styles.completedChallendContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}