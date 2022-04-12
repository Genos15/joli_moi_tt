export const useConvert = async (input: number) => {
    let error: string | undefined;
    let outcome: string | undefined;
    input > 0 && await (
        async function () {
            try {
                const headers: HeadersInit = {
                    'x-client-id': process.env.REACT_APP_CLIENT_ID || 'client_0'
                }
                const response = await window.fetch(`${process.env.REACT_APP_BASE_URL}roman/${input}`, {
                    method: 'GET', headers
                });
                const data = await response.text();
                if (data && data.length > 0) {
                    outcome = data
                }
            } catch (e) {
                error = `${e}`;
            }
        }
    )();

    if (!input || input === 0) {
        error = 'Invalid input. min value is 1';
    }

    return {outcome, error};
};