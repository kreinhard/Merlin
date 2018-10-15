import React from 'react';
import {PageHeader} from '../general/BootstrapComponents';
import {isDevelopmentMode} from "../../utilities/global";

class Start extends React.Component {

    render() {
        let todo = '';
        if (isDevelopmentMode()) {
            todo = <code><h3>ToDo</h3>
                <ul>
                    <li>Use Webpack for handling dev and production mode.</li>
                    <li>I18n: Get the translations from the server via json for labels etc. Do it globally or on every
                        single view?
                    </li>
                </ul>
            </code>
        }
        return (
            <React.Fragment>
                <PageHeader>
                    Start
                </PageHeader>
                {todo}
            </React.Fragment>
        );
    }
}

export default Start;
