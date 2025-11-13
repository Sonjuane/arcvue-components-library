I use lab-ex/ directory which stands for 'Lab Experiments' for coding experiments before I include it in the main source code. Please use lab-ex/vue-to-storybook and add a script that will be given a directory which will recursively look for files that ends with .story.vue and create a single .stories.js file. It will look and use default.story.vue to get the main info for the .stories.js file and convert all .story.vue files to a storybook story and append them to the .stories.js file.

I would like to use the Vue SFC syntax to create stories for Storybook.
Please create a node js script that will recursively look for files that end with .stories.js
It will look for a key "vue_stories" in the export default which will point to a directory and recursively look for files that end with .story.vue. It will then

The directory will be required to have

Create the following directo
