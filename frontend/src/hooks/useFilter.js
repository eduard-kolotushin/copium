import dayjs from "dayjs"
import { useSelector } from "react-redux"

export const useFilter = (data) => {
    const { fields, isInitialState } = useSelector(state => state.filterPublications)

    let articles = data
    if(fields.types.length !== 0) { articles = articles.filter(article => fields.types.includes(article?.type)) }
    if(fields.fs.length !== 0) { articles = articles.filter(article => fields.fs.includes(article?.type)) }
    if(fields.db.length !== 0) { articles = articles.filter(article => fields.db.includes(article?.type)) }

    if(fields.doi !== null) { articles = articles.filter(article => article?.doi === fields.doi) }
    if(fields.isbn !== null) { articles = articles.filter(article => article?.isbn === fields.isbn) }

    if(!dayjs(fields.date.from).isToday() || !dayjs(fields.date.to).isToday()) { articles = articles.filter(article => dayjs(article.date).isBetween(fields.date.from, fields.date.to, 'day', '[]')) }

    return { isInitialState, articles }
}