import{_ as e,c as n,a as o,o as a}from"./app.ab56574e.js";const h='{"title":"MarkdownEditor","description":"","frontmatter":{},"headers":[{"level":2,"title":"API","slug":"api"},{"level":2,"title":"Published Properties","slug":"published-properties"}],"relativePath":"packages/codemirror/docs/MarkdownEditor.md"}',l={};function i(r,t,s,u,g,d){return a(),n("div",null,t[0]||(t[0]=[o(`<h1 id="markdowneditor" tabindex="-1">MarkdownEditor <a class="header-anchor" href="#markdowneditor" aria-hidden="true">#</a></h1><p>MarkdownEditor displays an editable snippet of Markdown with syntax coloring and code folding.</p><div class="language-sample-code"><pre><code>
import { MarkdownEditor } from &quot;@hpcc-js/codemirror&quot;;

new MarkdownEditor()
    .target(&quot;target&quot;)
    .markdown(getMarkdownString())
    .render()
    ;

function getMarkdownString() {
    return \`\\
Markdown: Basics
================

&lt;ul id=&quot;ProjectSubmenu&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;/projects/markdown/&quot; title=&quot;Markdown Project Page&quot;&gt;Main&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a class=&quot;selected&quot; title=&quot;Markdown Basics&quot;&gt;Basics&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;/projects/markdown/syntax&quot; title=&quot;Markdown Syntax Documentation&quot;&gt;Syntax&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;/projects/markdown/license&quot; title=&quot;Pricing and License Information&quot;&gt;License&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;/projects/markdown/dingus&quot; title=&quot;Online Markdown Web Form&quot;&gt;Dingus&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;


Getting the Gist of Markdown&#39;s Formatting Syntax
------------------------------------------------

This page offers a brief overview of what it&#39;s like to use Markdown.
The [syntax page] [s] provides complete, detailed documentation for
every feature, but Markdown should be very easy to pick up simply by
looking at a few examples of it in action. The examples on this page
are written in a before/after style, showing example syntax and the
HTML output produced by Markdown.

It&#39;s also helpful to simply try Markdown out; the [Dingus] [d] is a
web application that allows you type your own Markdown-formatted text
and translate it to XHTML.

**Note:** This document is itself written using Markdown; you
can [see the source for it by adding &#39;.text&#39; to the URL] [src].

    [s]: /projects/markdown/syntax  &quot;Markdown Syntax&quot;
    [d]: /projects/markdown/dingus  &quot;Markdown Dingus&quot;
    [src]: /projects/markdown/basics.text


## Paragraphs, Headers, Blockquotes ##

A paragraph is simply one or more consecutive lines of text, separated
by one or more blank lines. (A blank line is any line that looks like
a blank line -- a line containing nothing but spaces or tabs is
considered blank.) Normal paragraphs should not be indented with
spaces or tabs.

Markdown offers two styles of headers: *Setext* and *atx*.
Setext-style headers for \\\`&lt;h1&gt;\\\` and \\\`&lt;h2&gt;\\\` are created by
&quot;underlining&quot; with equal signs (\\\`= \\\`) and hyphens (\\\` - \\\`), respectively.
To create an atx-style header, you put 1-6 hash marks (\\\`#\\\`) at the
beginning of the line -- the number of hashes equals the resulting
HTML header level.

Blockquotes are indicated using email-style &#39;\\\`&gt; \\\`&#39; angle brackets.

Markdown:

    A First Level Header
    ====================

    A Second Level Header
    ---------------------

    Now is the time for all good men to come to
    the aid of their country. This is just a
    regular paragraph.

    The quick brown fox jumped over the lazy
    dog&#39;s back.

    ### Header 3

    &gt; This is a blockquote.
    &gt;
    &gt; This is the second paragraph in the blockquote.
    &gt;
    &gt; ## This is an H2 in a blockquote


Output:

    &lt;h1&gt;A First Level Header&lt;/h1&gt;

    &lt;h2&gt;A Second Level Header&lt;/h2&gt;

    &lt;p&gt;Now is the time for all good men to come to
    the aid of their country. This is just a
    regular paragraph.&lt;/p&gt;

    &lt;p&gt;The quick brown fox jumped over the lazy
    dog&#39;s back.&lt;/p&gt;

    &lt;h3&gt;Header 3&lt;/h3&gt;

    &lt;blockquote&gt;
        &lt;p&gt;This is a blockquote.&lt;/p&gt;

        &lt;p&gt;This is the second paragraph in the blockquote.&lt;/p&gt;

        &lt;h2&gt;This is an H2 in a blockquote&lt;/h2&gt;
    &lt;/blockquote&gt;



### Phrase Emphasis ###

Markdown uses asterisks and underscores to indicate spans of emphasis.

Markdown:

    Some of these words *are emphasized*.
    Some of these words _are emphasized also_.

    Use two asterisks for **strong emphasis**.
    Or, if you prefer, __use two underscores instead__.

Output:

    &lt;p&gt;Some of these words &lt;em&gt;are emphasized&lt;/em&gt;.
    Some of these words &lt;em&gt;are emphasized also&lt;/em&gt;.&lt;/p&gt;

    &lt;p&gt;Use two asterisks for &lt;strong&gt;strong emphasis&lt;/strong&gt;.
    Or, if you prefer, &lt;strong&gt;use two underscores instead&lt;/strong&gt;.&lt;/p&gt;



## Lists ##

Unordered (bulleted) lists use asterisks, pluses, and hyphens (\\\`* \\\`,
\\\`+ \\\`, and \\\` - \\\`) as list markers. These three markers are
interchangable; this:

    *   Candy.
    *   Gum.
    *   Booze.

this:

    +   Candy.
    +   Gum.
    +   Booze.

and this:

    -   Candy.
    -   Gum.
    -   Booze.

all produce the same output:

    &lt;ul&gt;
    &lt;li&gt;Candy.&lt;/li&gt;
    &lt;li&gt;Gum.&lt;/li&gt;
    &lt;li&gt;Booze.&lt;/li&gt;
    &lt;/ul&gt;

Ordered (numbered) lists use regular numbers, followed by periods, as
list markers:

    1.  Red
    2.  Green
    3.  Blue

Output:

    &lt;ol&gt;
    &lt;li&gt;Red&lt;/li&gt;
    &lt;li&gt;Green&lt;/li&gt;
    &lt;li&gt;Blue&lt;/li&gt;
    &lt;/ol&gt;

If you put blank lines between items, you&#39;ll get \\\`&lt;p&gt;\\\` tags for the
list item text. You can create multi-paragraph list items by indenting
the paragraphs by 4 spaces or 1 tab:

    *   A list item.

        With multiple paragraphs.

    *   Another item in the list.

Output:

    &lt;ul&gt;
    &lt;li&gt;&lt;p&gt;A list item.&lt;/p&gt;
    &lt;p&gt;With multiple paragraphs.&lt;/p&gt;&lt;/li&gt;
    &lt;li&gt;&lt;p&gt;Another item in the list.&lt;/p&gt;&lt;/li&gt;
    &lt;/ul&gt;



### Links ###

Markdown supports two styles for creating links: *inline* and
*reference*. With both styles, you use square brackets to delimit the
text you want to turn into a link.

Inline-style links use parentheses immediately after the link text.
For example:

    This is an [example link](http://example.com/).

Output:

    &lt;p&gt;This is an &lt;a href=&quot;http://example.com/&quot;&gt;
    example link&lt;/a&gt;.&lt;/p&gt;

Optionally, you may include a title attribute in the parentheses:

    This is an [example link](http://example.com/ &quot;With a Title&quot;).

Output:

    &lt;p&gt;This is an &lt;a href=&quot;http://example.com/&quot; title=&quot;With a Title&quot;&gt;
    example link&lt;/a&gt;.&lt;/p&gt;

Reference-style links allow you to refer to your links by names, which
you define elsewhere in your document:

    I get 10 times more traffic from [Google][1] than from
    [Yahoo][2] or [MSN][3].

    [1]: http://google.com/        &quot;Google&quot;
    [2]: http://search.yahoo.com/  &quot;Yahoo Search&quot;
    [3]: http://search.msn.com/    &quot;MSN Search&quot;

Output:

    &lt;p&gt;I get 10 times more traffic from &lt;a href=&quot;http://google.com/&quot;
    title=&quot;Google&quot;&gt;Google&lt;/a&gt; than from &lt;a href=&quot;http://search.yahoo.com/&quot;
    title=&quot;Yahoo Search&quot;&gt;Yahoo&lt;/a&gt; or &lt;a href=&quot;http://search.msn.com/&quot;
    title=&quot;MSN Search&quot;&gt;MSN&lt;/a&gt;.&lt;/p&gt;

The title attribute is optional. Link names may contain letters,
numbers and spaces, but are *not* case sensitive:

    I start my morning with a cup of coffee and
    [The New York Times][NY Times].

    [ny times]: http://www.nytimes.com/

Output:

    &lt;p&gt;I start my morning with a cup of coffee and
    &lt;a href=&quot;http://www.nytimes.com/&quot;&gt;The New York Times&lt;/a&gt;.&lt;/p&gt;


### Images ###

Image syntax is very much like link syntax.

Inline (titles are optional):

    ![alt text](/path/to/img.jpg &quot;Title&quot;)

Reference-style:

    ![alt text][id]

    [id]: /path/to/img.jpg &quot;Title&quot;

Both of the above examples produce the same output:

    &lt;img src=&quot;/path/to/img.jpg&quot; alt=&quot;alt text&quot; title=&quot;Title&quot; /&gt;



### Code ###

In a regular paragraph, you can create code span by wrapping text in
backtick quotes. Any ampersands (\\\`&amp; \\\`) and angle brackets (\\\` &lt; \\\` or
\\\`&gt; \\\`) will automatically be translated into HTML entities. This makes
it easy to use Markdown to write about HTML example code:

    I strongly recommend against using any \\\`&lt;blink&gt;\\\` tags.

    I wish SmartyPants used named entities like \\\`&amp; mdash; \\\`
    instead of decimal-encoded entites like \\\`&amp;#8212; \\\`.

Output:

    &lt;p&gt;I strongly recommend against using any
    &lt;code&gt;&amp;lt;blink&amp;gt;&lt;/code&gt; tags.&lt;/p&gt;

    &lt;p&gt;I wish SmartyPants used named entities like
    &lt;code&gt;&amp;amp;mdash;&lt;/code&gt; instead of decimal-encoded
    entites like &lt;code&gt;&amp;amp;#8212;&lt;/code&gt;.&lt;/p&gt;


To specify an entire block of pre-formatted code, indent every line of
the block by 4 spaces or 1 tab. Just like with code spans, \\\`&amp; \\\`, \\\` &lt; \\\`,
and \\\`&gt; \\\` characters will be escaped automatically.

Markdown:

    If you want your page to validate under XHTML 1.0 Strict,
    you&#39;ve got to put paragraph tags in your blockquotes:

        &lt;blockquote&gt;
            &lt;p&gt;For example.&lt;/p&gt;
        &lt;/blockquote&gt;

Output:

    &lt;p&gt;If you want your page to validate under XHTML 1.0 Strict,
    you&#39;ve got to put paragraph tags in your blockquotes:&lt;/p&gt;

    &lt;pre&gt;&lt;code&gt;&amp;lt;blockquote&amp;gt;
        &amp;lt;p&amp;gt;For example.&amp;lt;/p&amp;gt;
    &amp;lt;/blockquote&amp;gt;
    &lt;/code&gt;&lt;/pre&gt;

## Fenced code blocks (and syntax highlighting)

\\\`\\\`\\\`javascript
for (var i = 0; i &lt; items.length; i++) {
    console.log(items[i], i); // log them
}
\\\`\\\`\\\`
\`;
}
</code></pre></div><p>MarkdownEditor extends <a href="./Editor.html">Editor</a>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h2 id="published-properties" tabindex="-1">Published Properties <a class="header-anchor" href="#published-properties" aria-hidden="true">#</a></h2><div class="language-@hpcc-js/codemirror:MarkdownEditor"><pre><code></code></pre></div>`,7)]))}var c=e(l,[["render",i]]);export{h as __pageData,c as default};
