import GroupIcon from '@mui/icons-material/Group'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import MessageIcon from '@mui/icons-material/Message'
import EmailIcon from '@mui/icons-material/Email'
import CloudIcon from '@mui/icons-material/Cloud'
import DescriptionIcon from '@mui/icons-material/Description'
import EventIcon from '@mui/icons-material/Event'

const routes=[
    {
        title: 'Пользователи',
        path: 'users',
        element: <></>,
        icon: <GroupIcon/>
    },
    {
        title: 'Научные достижения',
        path: 'publications',
        element: <></>,
        icon: <NewspaperIcon/>
    },
    // {
    //     title: 'Мероприятия',
    //     path: 'events',
    //     element: <></>,
    //     icon: <EventIcon/>
    // },
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