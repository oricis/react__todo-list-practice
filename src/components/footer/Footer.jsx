
import './footer.scss';
import React from 'react';

function Footer(props)
{
    const longText = (props.text)
        ? <p>{props.text}</p>
        : "";

    return (
        <footer>
            {longText}
            <p>Copyright © {props.author} {props.year}. {props.licence} Licensed.</p>
        </footer>
    );
}

export default Footer;
