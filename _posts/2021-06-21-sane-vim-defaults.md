---
title: "Sane Vim Defaults"
excerpt: "Vim remaps for those who think 'Y' should yank to EOL"
tags:
  - Vim
  - Neovim
  - Editors
  - IDE
toc: true
toc_sticky: true
---

<!-- Load in a highlight.js theme for code blocks -->
<link rel="stylesheet" href="/assets/css/highlight/base16/gruvbox-dark-hard.min.css">

<hr>

<h4 id="assertions" class="article-header-start">Assertions</h4>
<p class="article-text">
  I'm not a Vim evangelist. I'm apathetic toward the editor itself, and instead view Vim's keybindings as its edge.
  I'd actually argue the case for VSCode as the better out-of-the-box lightweight editing experience, and VSCode with
  Vim keybindings as a better text editor than native Vim or Neovim.<br><br>

  That said, while most of Vim's default keybindings are great, a select few aren't. Thankfully most inconsistencies
  have heretical remaps that I'd encourage even the purist Vim users give a chance.
</p>

<h4 id="reference" class="article-header-start">Reference</h4>
<p class="article-text">
  All remaps mentioned are visible in my public dotfiles. For a Vimscript reference, go
  <a class="article-text-link" href="https://github.com/dominicpalmer/dotfiles/tree/master/archive/nvim_vimscript">here</a> and
  have a read through <code class="article-text">remaps_common.vim</code> and <code class="article-text">remaps_nvim.vim</code>.
  For those acquainted with Lua configuration in Neovim, go
  <a class="article-text-link" href="https://github.com/dominicpalmer/dotfiles/blob/master/archive/nvim/lua/core/remaps.lua">here</a>.
</p>

<h4 id="navigation" class="article-header-start">Navigation</h4>
<p class="article-text">
  <code class="article-text">hjkl</code> makes sense for arrow-key movements: each key is on or near the home row and
  vertical movements are under the strongest fingers. It wouldn't be unreasonable to expect vertical movements by
  paragraph to follow the same pattern. They don't - the defaults are <code class="article-text">{</code> and
  <code class="article-text">}</code>. These keys are at a distance from the home row, and their usage is delegated
  to the right pinky. The fix is simple:
</p>

<pre class="article-text"><code class="vim">noremap J }
noremap K {
</code></pre>

<p class="article-text">
  Remapping <code class="article-text">K</code> is no big deal, since all the original command did was run
  <code class="article-text">man</code> on the word under the cursor. This is a feature that's rarely used. The second
  incurred cost is from remapping <code class="article-text">J</code>. This originally joined lines, which is something
  most will not want to lose. We can both retain the functionality and honour the original mnemonic with
  <code class="article-text">M</code> for <i>merge</i> lines:
</p>

<pre class="article-text"><code class="vim">noremap M J
</code></pre>

<p class="article-text">
  The net cost is now the use of <code class="article-text">M</code> to center the cursor in the middle of the screen.
  <code class="article-text">M</code> as originally designed is a relatively unused feature with viable alternatives.
  It could be mapped to a less frequently used keybinding such as <code class="article-text">&lt;leader&gt;M</code>,
  although the total loss of the functionality would is arguably still worth the improved movement by paragraphs regardless.
  <br><br>

  An added benefit is that <code class="article-text">{</code> and <code class="article-text">}</code> are freed up to
  be remapped. I remap them to pageup and pagedown:
</p>

<pre class="article-text"><code class="vim">noremap } &lt;C-f&gt;
noremap { &lt;C-b&gt;
</code></pre>

<p class="article-text">
  Upholding consistency, movements to the BOL or EOL would be better imagined as extensions to horizontal movement
  by a single character:
</p>

<pre class="article-text"><code class="vim">noremap H ^
noremap ^ H
noremap L $
noremap $ L
</code></pre>

<h4 id="yank" class="article-header-start">Yank, Paste, Till and Replace</h4>
<p class="article-text">
  <code class="article-text">y</code> is an awkward character key to reach, yet it's given an important role of yanking
  text. <code class="article-text">p</code> isn't much better, being handled by the pinky if you type with 'correct'
  touch typing form, or the right ring finger if using the pinky isn't comfortable. The two keys are also often used in
  quick succession, an example being <code class="article-text">yyp</code> to duplicate the current line.<br><br>

  On the flip side, both <code class="article-text">t</code> and <code class="article-text">r</code> can be comfortably
  reached by the left index finger. Given till and replace aren't quite as vital as yank and paste, they are good candidates
  for remapping. In the spirit of Vim's mnemonics, we can move yank to <code class="article-text">t</code> for
  <i>take</i>, and paste to <code class="article-text">r</code> for <i>resolve</i>:
<p class="article-text">

<pre class="article-text"><code class="vim">noremap t y

noremap r p
noremap R P
noremap ]r ]p
</code></pre>

<p class="article-text">
  You might have noticed <code class="article-text">noremap T Y</code> is missing. This needs a special mention, because
  the default functionality assigned to <code class="article-text">Y</code> is inconsistent.
  <code class="article-text">D</code> deletes to EOL, <code class="article-text">A</code> appends to EOL,
  <code class="article-text">C</code> changes to EOL, and if you've adopted the navigation remaps earlier,
  <code class="article-text">H</code> and <code class="article-text">L</code> will move the cursor to BOL and EOL
  respectively. But by default, <code class="article-text">Y</code> yanks the entire line irrespective of the cursor
  location.<br><br>

  There is no real reason for this. The use of <code class="article-text">Y</code> to yank a line dates back to the
  <a class="article-text-link" href="https://github.com/n-t-roff/ex-1.1">first version of vi</a>, released on January 1st, 1978.
  When you go this far back, you'll find that <code class="article-text">yy</code> as an abbreviation for
  <code class="article-text">y</code> applied to the entire line isn't featured. That's fine. The issue is that once
  <code class="article-text">yy</code> was introduced, <code class="article-text">Y</code> was never reassigned to align
  with the other shifted line-wise commands. Let's fix that by remapping <code class="article-text">T</code> to yank
  (now <i>take</i>) to EOL:
</p>

<pre class="article-text"><code class="vim">noremap T y$
</code></pre>

<p class="article-text">
  With these remaps in place, we need to move the original functionality for till and replace over
  to where yank and paste used to be. We can again try to maintain some resemblance of a mnemonic by using
  <code class="article-text">y</code> for <i>yet</i>, and <code class="article-text">p</code> for <i>place</i>:
</p>

<pre class="article-text"><code class="vim">noremap y t
noremap Y T

noremap p r
noremap P R
</code></pre>

<h4 id="extensions" class="article-header-start">Extensions</h4>
<p class="article-text">
  The remaps that follow provide functionality you might assume Vim has by default, but doesn't. These aren't as heretical
  as those mentioned above, but they do alter the default keybindings.<br><br>

  Vim doesn't have a keybinding to clear the content of the line you're on, without deleting the line entirely. Easily
  fixed:
</p>

<pre class="article-text"><code class="vim">nnoremap X 0D
</code></pre>

<p class="article-text">
  The cost here is the loss of normal mode backspace. But on that note, why was normal mode backspace mapped to
  <code class="article-text">X</code> to begin with?<br><br>

  Every keyboard has a backspace key, so let's use it:
</p>

<pre class="article-text"><code class="vim">nnoremap &lt;BS&gt; X
</code></pre>

<p class="article-text">
  Another missing feature is the insertion of newlines above or below the cursor, without entering normal mode as a side
  effect. Again, straightforward fix:
</p>

<pre class="article-text"><code class="vim">nnoremap &lt;CR&gt; o&lt;Esc&gt;
nnoremap &lt;leader&gt;&lt;CR&gt; O&lt;Esc&gt;
</code></pre>

<p class="article-text">
  In most software that allows freeform text input, pressing enter when text is selected will replace the text with a
  newline character. I don't think it's unreasonable to expect Vim to behave in a similar way.<br><br>

  Instead of replacing the text with a newline character, let's have <code class="article-text">&lt;CR&gt;</code> delete
  the text and leave the cursor on the same line as the start of the original selection:
</p>

<pre class="article-text"><code class="vim">vnoremap &lt;CR&gt; d
</code></pre>

<p class="article-text">
  By default, <code class="article-text">U</code> will undo changes made only to the line under the cursor. This isn't
  very useful. With <code class="article-text">u</code> as undo, <code class="article-text">U</code> as redo makes
  more sense:
</p>

<pre class="article-text"><code class="vim">nnoremap U &lt;C-r&gt;
</code></pre>

<h4 id="conclusion" class="article-header-start">Conclusion</h4>
<p class="article-text">
  Along with the remaps above, there are other defaults worth a mention. <code class="article-text">S</code> is a
  duplication of <code class="article-text">cc</code>, <code class="article-text">Q</code> is rarely used and is a good
  candidate for reassignment, and there aren't any undo breakpoints set for symbols that perhaps ought to be, such as
  <code class="article-text">,</code>, <code class="article-text">.</code> and <code class="article-text">!</code>.<br><br>

  Most heretical Vim remaps are just logical corrections and extensions of long-standing inconsistencies and missing
  features, and better yet, they be introduced with almost no net cost to core functionality.
</p>
