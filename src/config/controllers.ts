import Autowiring from '../core/autowiring/Autowiring'
import AccueilController from '../controllers/AccueilController'
import Picture from '../models/Picture'
import ApiPictureController from '../controllers/api/ApiPictureController'
import ApiUserController from '../controllers/api/ApiUserController'
import User from '../models/User'
import ApiCommentController from '../controllers/api/ApiCommentController'
import Comment from '../models/Comment'
import ApiCategoryController from '../controllers/api/ApiCategoryController'
import Category from '../models/Category'
import ApiGaleryController from '../controllers/api/ApiGaleryController'
import VirtualFolder from '../models/VirtualFolder'
import ApiVirtualFolderController from '../controllers/api/ApiVirtualFolderController'

let controllers: Autowiring = new Autowiring()
controllers
    .setController(
        'AccueilController',
        new AccueilController()
    )
    .setController(
        'ApiPictureController',
        new ApiPictureController(
            new Picture(),
            new Category(),
            new VirtualFolder(),
            new Comment()
        )
    )
    .setController(
        'ApiUserController',
        new ApiUserController(
            new User(),
            new VirtualFolder()
        )
    )
    .setController(
        'ApiCommentController',
        new ApiCommentController(
            new Comment()
        )
    )
    .setController(
        'ApiCategoryController',
        new ApiCategoryController(
            new Category()
        )
    )
    .setController(
        'ApiGaleryController',
        new ApiGaleryController(
            new Picture()
        )
    )
    .setController(
        'ApiVirtualFolderController',
        new ApiVirtualFolderController(
            new VirtualFolder()
        )
    )

export default controllers