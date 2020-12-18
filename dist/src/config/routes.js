"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let routes = [
    {
        method: 'GET',
        link: '/',
        name: 'Accueil',
        action: 'AccueilController@index'
    },
    {
        method: 'GET',
        link: '/galery',
        name: 'Galerie',
        action: 'AccueilController@galery'
    },
    {
        method: 'GET',
        link: '/detail/:id',
        name: 'Detail',
        action: 'AccueilController@detail'
    },
    {
        method: 'GET',
        link: '/login',
        name: 'Login',
        action: 'AccueilController@login'
    },
    {
        method: 'GET',
        link: '/dashboard',
        name: 'Logged',
        action: 'AccueilController@dashboard'
    },
    {
        method: 'GET',
        link: '/table',
        name: 'Logged',
        action: 'AccueilController@table'
    },
    {
        method: 'POST',
        link: '/login',
        name: 'Connection',
        action: 'AccueilController@connection'
    },
    {
        method: 'GET',
        link: '/api/pictures',
        name: 'Api-Pictures',
        action: 'ApiPictureController@index'
    },
    {
        method: 'GET',
        link: '/api/picture/:id',
        name: 'Api-Picture',
        action: 'ApiPictureController@detail'
    },
    {
        method: 'GET',
        link: '/api/picturesBy/:id',
        name: 'Api-Pictures',
        action: 'ApiPictureController@picturesByID'
    },
    {
        method: 'GET',
        link: '/api/user/:id',
        name: 'Api-User',
        action: 'ApiUserController@detail'
    },
    {
        method: 'GET',
        link: '/api/comments/:id',
        name: 'Api-Comment',
        action: 'ApiCommentController@comments'
    },
    {
        method: 'GET',
        link: '/api/galery/:id',
        name: 'Api-Galery',
        action: 'ApiGaleryController@galery'
    },
    {
        method: 'GET',
        link: '/api/categories',
        name: 'Api-Category',
        action: 'ApiCategoryController@categories'
    },
    {
        method: 'GET',
        link: '/logout',
        name: 'Logout',
        action: 'AccueilController@logout'
    },
    {
        method: 'GET',
        link: '/api/statistics/:id',
        name: 'Api-State',
        action: 'ApiUserController@statistics'
    },
    {
        method: 'GET',
        link: '/api/statisticsbymonth/:id',
        name: 'Api-State',
        action: 'ApiUserController@statisticsByMonth'
    },
    {
        method: 'GET',
        link: '/api/virtualFolders/:id',
        name: 'Api-Virtual-Folders',
        action: 'ApiUserController@virtualFolders'
    },
    {
        method: 'POST',
        link: '/api/addVirtualFolder',
        name: 'Api-Add-Virtual-Folders',
        action: 'ApiVirtualFolderController@addVirtualFolder'
    },
    {
        method: 'GET',
        link: '/detail-picture/:id',
        name: 'User-Detail-Picture',
        action: 'AccueilController@detailPicture'
    },
    {
        method: 'GET',
        link: '/api/detail-picture/:id',
        name: 'Api-Detail-Picture',
        action: 'ApiPictureController@pictureDetail'
    },
    {
        method: 'POST',
        link: '/api/update-picture',
        name: 'Api-Update-Picture',
        action: 'ApiPictureController@updatePicture'
    },
    {
        method: 'POST',
        link: '/api/delete-comment',
        name: 'Api-Delete-Comment',
        action: 'ApiCommentController@deleteComment'
    },
    {
        method: 'POST',
        link: '/api/add-comment',
        name: 'Api-Add-Comment',
        action: 'ApiCommentController@addComment'
    },
    {
        method: 'GET',
        link: '/new',
        name: 'New-Picture',
        action: 'AccueilController@newPicture'
    },
    {
        method: 'POST',
        link: '/new',
        name: 'New-Picture',
        action: 'AccueilController@addPicture'
    }
];
exports.default = routes;
