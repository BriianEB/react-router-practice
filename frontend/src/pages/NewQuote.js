import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';

import QuoteForm from '../components/quotes/QuoteForm';

import { addQuote } from '../lib/api';


function NewQuote() {
    const { sendRequest, status } = useHttp(addQuote);
    const history = useHistory();

    useEffect(function () {
        if (status === 'completed') {
            history.push('/quotes');
        }
    }, [status, history]);

    function addQuoteHandler(quoteData) {
        sendRequest(quoteData);
    }

    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
    );
}

export default NewQuote;
