import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startContDown: () => void;
    resetContDown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let contDownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const { startNewChallenge } = useContext(ChallengesContext);

    const minutes  = Math.floor(time/60);
    const seconds = time % 60;

    function startContDown() {
        setIsActive(true);
    }

    function resetContDown() {
        clearTimeout(contDownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0){
            contDownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);


    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startContDown,
            resetContDown,
        }}>
            {children}
        </CountdownContext.Provider>
    );
}