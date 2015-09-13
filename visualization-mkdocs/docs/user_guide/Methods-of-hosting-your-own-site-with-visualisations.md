## RawGit

 Paste 

    https://github.com/hpcc-systems/Visualization/blob/master/my_widget/my_first_widget.html

into the prompt and now enjoy your widget hosted online! 

RawGit should be used for the early dev/testing stage, GitHub Pages is a much more efficient method of hosting. 

## GitHub Pages and Jekyll

The process of setting up a website hosted on GitHub is explained here

    https://help.github.com/articles/creating-pages-with-the-automatic-generator/

and when the user is comfortable with establishing a new Project Page or Organisation Page we will then move onto 
using GutHub Pages with Jekyll. 

Assuming the user is comfortable with how GitHub Pages works, let's now incorporate them with Jekyll.

Jekyll powers GitHub Pages and it is a _blog aware, static site generator in Ruby_.

The following two links should be all that is needed to get up to speed with what Jekyll _is_ and what Jekyll _does_.

[Jekyll]

[Jekyll bootstrap]

[Jekyll]: http://jekyllrb.com/
[Jekyll bootstrap]: http://jekyllbootstrap.com/


To install Jekyll, run the following command in the directory that will contain your website

   ``` gem install jekyll ```

now, we have Jekyll installed in our web directory. We use the following command to create a new Jekyll directory
that will contain the boilerplate Jekyll code that will contain the webpage files 

   ``` jekyll new website_directory ```

and change into this directory

   ``` cd website_directory ```

and inspecting it's contents it should have the following structure

``` _config.yml	_site
_includes	about.md
_layouts	css
_posts		feed.xml
_sass		index.html ```

and [http://jekyllbootstrap.com/lessons/jekyll-introduction.html#toc_6](here) gives a good explanation of the purpose of each of these files. 

To host the webpage locally, run the following 

  ``` jekyll serve ```

and open a web browser and search 

  ``` http://localhost:4000 ``` 

The beauty of this is we can push this to the repo from where the website will be hosted and all content can be managed by Jekyll locally and always saved by GitHub - also there will be no hosting problems in relation to updating the site, in contrast to the case of RawGit. 