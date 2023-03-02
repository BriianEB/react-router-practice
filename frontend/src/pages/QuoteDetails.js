import { Fragment, useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import useHttp from '../hooks/use-http';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import { getSingleQuote } from '../lib/api';


function QuoteDetails() {
    const match = useRouteMatch();
    const params = useParams();

    const { quoteId } = params;

    const { sendRequest, status, data, error } = useHttp(getSingleQuote, true);

    useEffect(function () {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <p className="centered">{error}</p>
        );
    }

    if (!data.text) {
        return (
            <p>No quote found!</p>
        );
    }

    return (
        <Fragment>
            <HighlightedQuote text={data.text} author={data.author} />
            <Route path={`${match.path}`} exact>
            <div className="centered">
              <Link className="btn--flat" to={`${match.url}/comments`}>
                Load comments
              </Link>
            </div>
            </Route>
            <Route path={`${match.path}/comments`}>
              <Comments />
            </Route>
        </Fragment>
    );
}

export default QuoteDetails;
