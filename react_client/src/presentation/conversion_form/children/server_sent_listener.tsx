import React, {useEffect, useState} from "react";

const ServerSentListener: React.FC = () => {
    const [listening, setListening] = useState<boolean>(false);
    const [outcome, setOutcome] = useState<string | undefined>();

    useEffect(() => {
        if (!('EventSource' in window)) {
            return;
        }

        let isMounted = true;
        let events: EventSource | undefined;
        if (isMounted && !listening) {
            events = new EventSource(`${process.env.REACT_APP_BASE_URL}events/${process.env.REACT_APP_CLIENT_ID}`);
            events.onopen = () => {
                setListening(true);
            };

            events.onmessage = (event) => {
                event.data && setOutcome(event.data);
            };

            events.onerror = () => {
                setListening(false);
                events?.close();
            };
        }
        return () => {
            events?.close();
            setListening(true);
            isMounted = false;
        };
    }, []);

    return <>
        {outcome && <p>LAST VALUE FROM SERVER: <span className={'converted--value'}>{outcome}</span></p>}
    </>;
}

export default ServerSentListener;