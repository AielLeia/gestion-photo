import { render } from 'react-dom'
import * as React from 'react'
import Accueil from './AccueilComponent/Accueil'
import Detail from './DetailComponent/Detail'
import Galery from './GaleryComponent/Galery'
import Dashboard from './DashboardComponent/Dashboard'
import Table from './TableComponent/Table'
import DetailPicture from './DetailPictureComponent/DetailPicture'


let react = document.querySelector<HTMLElement>('[data-react]')
if (react !== undefined && react !== null) {
    switch (react.getAttribute('id')) {
        case 'accueil-index':
            // Page d'accueil
            render(
                <Accueil />,
                react
            )
            break
        case 'accueil-detail':
            // Page de detail
            render(
                <Detail
                    id={ react.dataset.id || '' }
                />,
                react
            )
            break
        case 'accueil-galery':
            // Page de galérie
            render(
                <Galery />,
                react
            )
            break
        case 'dashboard':
            render(
                <Dashboard
                    userId={ react.dataset.userid || '' }
                />,
                react
            )
            break
        case 'table':
            render(
                <Table
                    userId={ react.dataset.userid || '' }
                />,
                react
            )
            break
        case 'detail-picture':
            render(
                <DetailPicture
                    userId={ react.dataset.userid || '' }
                    pictureId={ react.dataset.pictureid || '' }
                />,
                react
            )
            break
        default:
            break
    }
}
