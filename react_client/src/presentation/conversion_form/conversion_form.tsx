import React, {useState} from "react";
import * as handler from './controllers/conversion_controller';
import ServerSentListener from "./children/server_sent_listener";
import '../../style/convert.css';

const ConversionForm: React.FC = () => {
    const [input, setInput] = useState<number>(1);
    const [error, setError] = useState<string | undefined>();
    const [outcome, setOutcome] = useState<string | undefined>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const income = event.target.value;
        if (!Number.isNaN(income) && Number.isInteger(parseInt(income))) {
            setInput(parseInt(income));
        } else if (income.trim().length === 0) {
            setInput(0);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError(undefined);
        const {outcome, error} = await handler.useConvert(input);
        if (error) {
            setError(error);
        }
        if (outcome) {
            setOutcome(outcome);
        }
    }

    return <>
        <form onSubmit={handleSubmit}>
            <label>Enter your number:
                <input type="number" value={input} onChange={handleChange} min={1} required/>
            </label>
            <button type="submit">send</button>
        </form>
        {error && <p className={'conversion--error'}>{error}</p>}
        {outcome && !error && <p>VALUE FROM AJAX: <span className={'converted--value'}>{outcome}</span></p>}
        <ServerSentListener/>
    </>;
};

export default ConversionForm;