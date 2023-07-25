import dayjs from "dayjs"
import { useEffect, useState } from "react"

export default function useDocuments(){
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        (new Promise((resolve, reject) => setTimeout(() => {
            resolve(json_files)
        }, 300))).then(result => { 
            setData(result)
            setIsLoading(false)
        })
    }, [])

    return { data, isLoading }
}

const json_files = [
    {
        title: "vacation",
        label: "Заявление на отпуск",
        description: "Форма заявления на отпуск.",
        fields: [
            {
                type: "date",
                title: "date_current",
                label: "Дата составления",
                defaultValue: dayjs().format('YYYY-MM-DD')
            },
            {
                type: "date-range",
                title: "date",
                label: {
                    from: "Начало отпуска",
                    to: "Конец отпуска"
                },
                defaultValue: {
                    from: dayjs().format('YYYY-MM-DD'),
                    to: dayjs().format('YYYY-MM-DD')
                }
            },
            {
                type: "select",
                title: "access_to_secret",
                label: "Допуск к государственной тайне",
                options: [
                    "Допуска к государственной тайне не имею.",
                    "Заявление на выезд за рубеж оформил(а)."
                ],
                defaultValue: ""
            }
        ]
    },
    {
        title: "exp-zak",
        label: "Экспертное заключение",
        description: "Форма экспертного заключения. Должна быть подписана тремя экспертами из установленного институтом списка.",
        fields: [
            {
                type: "date",
                title: "date_current",
                label: "Дата составления",
                defaultValue: dayjs().format('YYYY-MM-DD')
            },
        ]
    }
]