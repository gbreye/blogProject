import { useState } from "react";
import './css/addpage.css';

function Post() {
    return(
        <section className="mainContent">
            <form>
                <textarea name="title" id="title" placeholder="Insert the title of your Post!"></textarea>
                <textarea name="subTitle" id="subTitle" placeholder="Insert the subtitle of your Post!"></textarea>
                <textarea name="textBlock" id="textBlock" placeholder="Insert the content of your Post!"></textarea>
                <button type="submit"></button>
            </form>
        </section>
    );
}

export default Post