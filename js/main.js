import {generatePosts} from './data.js';
import {renderPictures} from './render-pictures.js';

const postsData = generatePosts();
renderPictures(postsData);
