# grunt-jsp-linter

> Lint jsp/html files with htmlhint applying some replacement to the JSP to make it work.

## Getting Started
This plugin requires Grunt `~0.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install "git+https://github.com/odigeoteam/grunt-jsp-linter.git" --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsp-linter');
```

## The "jsplinter" task

### Overview
In your project's Gruntfile, add a section named `jsplinter` to the data object passed into `grunt.initConfig()`.

### Options

See all rules here: [https://github.com/yaniswang/HTMLHint/wiki/Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)

If options is empty, task will scan nothing.

#### options.htmlhintrc
Type: `String`
Default value: `null`

If this filename is specified, options and globals defined therein will be used. Task and target options override the options within the `htmlhintrc` file. The `htmlhintrc` file must be valid JSON and looks something like this:

```json
{
  "tag-pair": true,
}
```

#### options.force
Type: `Boolean`
Default value: `false`

Report HTMLHint errors but dont fail the task

### Usage Examples

#### Direct options

```js
jsplinter: {
  html1: {
    options: {
      'tag-pair': true
    },
    src: ['path/to/**/*.jsp']
  },
  html2: {
    options: {
      'tag-pair': true
    },
    src: ['path/to/**/*.jsp']
  }
}
```

#### Config file

```js
jsplinter: {
  options: {
    htmlhintrc: '.htmlhintrc'
  },
  html1: {
    src: ['path/to/**/*.jsp']
  },
  html2: {
    src: ['path/to/**/*.jsp']
  }
}
```

## Limitations and caveats

There are a set of things that can make the validation fail even if the are theoretically valid.

### < / > symbols

Try to avoid the use of < or > symbols on the documents. Use HTML entities instead:

| character   | html      |
| ----------- |-----------|
| <           | ```&lt;```|
| >           | ```&gt;```|

### tag mixing

Structures like the above will make lint to fail:

```jsp
<c:if test="{condition}">
  <div class"wrap-if-condition">
</c:if>
    <div>This is allways shown</div>
<c:if test="{condition}">
  </div>
</c:if>
```

This kind of structures are avoidable but if you really need them you can skip the linter with the wrapping them with the special comment ```<%--IGNOREJSPLINTER--%>```:

```jsp
<%--IGNOREJSPLINTER--%><c:if test="{condition}">
  <div class"wrap-if-condition">
</c:if><%--IGNOREJSPLINTER--%>

    <div>This is allways shown</div>

<%--IGNOREJSPLINTER--%><c:if test="{condition}">
  </div>
</c:if><%--IGNOREJSPLINTER--%>
```

By doing that, the linter will skip the sections wrapped.

### Multifile blocks

Closing blocks on different files where they where oppened is not an option.

```jsp
<div>
<jsp:include page="closingdiv.jsp" />
 ```

## How to fix lint errors

Althoug the plugins is telling you the line and column where a problem appears, it must be hard to find the problem. A good idea is to run jsplinter with ```--verbose``` to get the processed file contents and paste it on [htmlhint.com](http://htmlhint.com/) to find out the problem on a visual way.

## Release History

 * 2015-04-07   v0.1.0   First release
 * 2016-08-30   v0.1.1   Dependencies updated

