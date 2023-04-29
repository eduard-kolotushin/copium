import NewspaperIcon from '@mui/icons-material/Newspaper'
import MessageIcon from '@mui/icons-material/Message'
import EmailIcon from '@mui/icons-material/Email'
import CloudIcon from '@mui/icons-material/Cloud'
import DescriptionIcon from '@mui/icons-material/Description'

const routes=[
    {
        title: 'Публикации',
        path: 'publications',
        element: <></>,
        icon: <NewspaperIcon/>
    },
    {
        title: 'Мессенджер',
        path: 'messenger',
        icon: <MessageIcon/>
    },
    {
        title: 'Почта',
        path: 'email',
        icon: <EmailIcon/>
    },
    {
        title: 'Облако',
        path: 'cloud',
        icon: <CloudIcon/>
    },
    {
        title: 'Документы',
        path: 'documents',
        icon: <DescriptionIcon/>
    }
]

export default routes