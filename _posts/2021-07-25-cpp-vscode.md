---
title: "Visual Studio Code as a C++ Development Environment"
excerpt: "How to get VSCode intellisense to work with C++ projects"
tags:
  - VSCode
  - C++
  - Extensions
  - IDE
toc: true
toc_sticky: true
---

<!-- Load in a highlight.js theme for code blocks -->
<link rel="stylesheet" href="/assets/css/highlight/base16/gruvbox-dark-hard.min.css">

<hr>

<div class="article-content-start">
  <p class="article-text">
    <img class="article-text-image" src="/assets/images/vscode-cpp.png" alt="vscode-cpp-preview">
    <span class="article-text-image-caption">
      <a class="article-text-link" href="https://code.visualstudio.com/docs/languages/cpp">Source: The Official VSCode C++ Documentation</a>.
    </span>
  </p>
</div>

<h4 id="overview">Overview</h4>
<p class="article-text">
  With sufficient time spent on initial setup and configuration, VSCode can work well as a primary editor for C++ projects.
  It might not be as lightweight as Vim, but VSCode's flexible configuration model makes is relatively straightfoward
  to work with.<br><br>

  These are some notes on one way of getting set up.
</p>

<h4 id="baseline">Baseline</h4>
<p class="article-text">
  Assuming you have the official
  <a class="article-text-link" href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools">C/C++ VSCode extension</a>
  installed, the very first thing you'll want to do is set the default include path in your global
  <code class="article-text">settings.json</code>. If you have libraries on disk you use frequently enough to warrant
  being visible to all of your projects (whether they're linked or not), this is the place to list them:
</p>

<pre class="article-text"><code class="language-json">"C_Cpp.default.includePath": ["path-one", "path-two"]
</code></pre>

<p class="article-text">
  For every C++ project you work on, you'll also want to create a workspace
  <code class="article-text">.vscode/c_cpp_properties.json</code> to store project specific configuration details such
  as the <code class="article-text">intellisenseMode</code>, <code class="article-text">includePath</code>,
  <code class="article-text">compilerPath</code> and <code class="article-text">cppStandard</code>.<br><br>

  Make sure that each project's <code class="article-text">c_cpp_properties.json</code> includes the default
  <code class="article-text">includePath</code> defined in <code class="article-text">settings.json</code>. This way, the
  default path will be searched in addition to any project specific paths. Also ensure that the
  <code class="article-text">c_cpp_properties.json</code> configuration aligns perfectly with whatever tooling is being
  used for the project. The <code class="article-text">intellisenseMode</code> needs to be spot on here, else VSCode may
  give misdirected warnings about missing headers.
</p>

<h4 id="intellisense">Intellisense</h4>
<p class="article-text">
  It's important to keep in mind that configuration defined in <code class="article-text">c_cpp_properties.json</code> only
  impacts intellisense for the project in which it is included. By setting a default C/C++
  <code class="article-text">includePath</code> in a workspace or global <code class="article-text">settings.json</code>,
  and setting an <code class="article-text">includePath</code> in a project specific
  <code class="article-text">c_cpp_properties.json</code> that points to this default, all you are doing is making
  VSCode's intellisense aware of the existence of these default headers for that specific project.<br><br>

  If the <code class="article-text">includePath</code> entries in these configuration files were omitted, VSCode would
  have no way to enforce intellisense in any meaningful sense. In such a case, warnings about missing symbols might get
  thrown, but projects may still compile. This is because most compilers perform their own predefined searches for headers
  during compilation.<br><br>

  Ultimately, the process of setting a sensible <code class="article-text">includePath</code> for C++ projects is to align
  VSCode's intellisense header search as closely as possible with the underlying compiler search, so that symbol resolution
  reflects what the compiler is actually aware of.<br><br>

  Similarly, to get the compiler to find external libraries when <i>linking</i>, set up a
  <code class="article-text">.vscode/tasks.json</code> with an appropriately matching
  <code class="article-text">includePath</code> entry, or do away with task based header resolution altogether and use
  a dedicated build system such as CMake.
</p>

<h4 id="tooling">Integrating external tooling</h4>
<p class="article-text">
  VSCode allows users to integrate external tooling common to C++ development exactly as it does with any other language.
  A means to call compilers, linters and formatters is provided through the
  <code class="article-text">tasks.json</code> configuration file. Here you can define commands that run anything
  you otherwise would from a terminal, all without leaving the editor window.<br><br>

  For a rundown of what can be done using tasks in VSCode, the
  <a class="article-text-link" href="https://code.visualstudio.com/docs/editor/tasks">documentation</a> gives a detailed
  overview.<br><br><br>
</p>
