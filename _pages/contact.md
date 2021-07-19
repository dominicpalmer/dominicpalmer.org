---
permalink: /contact/
title: "Contact"
excerpt: "Contact page"
author_profile: true
redirect_from:
  - /contact.html
---

<hr>

<p class="article-text">
    The best way to contact me is via email at <a class="article-text-link" href="mailto:dominicpalmer_@outlook.com">dominicpalmer_@outlook.com</a>,
    but I do pick up and respond to messages on LinkedIn too.<br><br>

    With LinkedIn as the one exception, I don't have or use any social media. For a faster way to get in touch,
    send me a message directly below.
</p>

<div id="contact-form-container">
    <form id="contact-form" method="post" action="https://formspree.io/f/mayadjek">
        <div>
            <label class="article-text" for="contact-form-name">Your name</label>
            <div>
                <input type="text" id="contact-form-name" name="Name" required>
            </div>
        </div>

        <div>
            <label class="article-text" for="contact-form-email">Your email address</label>
            <div>
                <input type="email" id="contact-form-email" name="Email" required>
            </div>
        </div>

        <div>
            <label class="article-text" for="contact-form-message">Your message</label>
            <div>
                <textarea id="contact-form-message" name="Message" rows="6" maxlength="3000" required></textarea>
            </div>
        </div>

        <div>
            <button id="contact-form-button" class="article-text" type="submit">Send Message</button>
        </div>
    </form>
</div>
