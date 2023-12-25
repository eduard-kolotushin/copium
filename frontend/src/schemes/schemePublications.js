import dayjs from "dayjs";

export const schemePublications = [
    {
        p_type: 'article',
        title: 'Публикация в журнале',
        fields: [
            {
                name: 'title',
                title: 'Название',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле'
                }
            },
            {
                name: 'authors',
                title: 'Авторы',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'doi',
                title: 'DOI',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'date',
                title: 'Дата публикации',
                type: 'date',
                initialState:  dayjs().format('YYYY-MM-DD'),
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'journal',
                title: 'Название журнала',
                type: 'text',
                initialState: '',
                rules: {
                    required: true
                }
            },
            {
                name: 'volume',
                title: 'Том',
                type: 'number',
                initialState: 0,
                xs: 4,
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'issue',
                title: 'Выпуск',
                type: 'number',
                initialState: 0,
                xs: 4
            },
            {
                name: 'page',
                title: 'Страница',
                type: 'number',
                initialState: 0,
                xs: 4,
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'isbn',
                title: 'ISBN',
                type: 'text',
                initialState: '',
            }
        ]
    },
    {
        p_type: 'thesis',
        title: 'Публикация в сборнике тезисов',
        fields: [
            {
                name: 'title',
                title: 'Название',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле'
                }
            },
            {
                name: 'authors',
                title: 'Авторы',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'doi',
                title: 'DOI',
                type: 'text',
                initialState: '',
            },
            {
                name: 'date',
                title: 'Дата публикации',
                type: 'date',
                initialState:  dayjs().format('YYYY-MM-DD'),
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'isbn',
                title: 'ISBN',
                type: 'text',
                initialState: '',
            }
        ]
    },
    {
        p_type: 'monography',
        title: 'Монография',
        fields: [
            {
                name: 'title',
                title: 'Название',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле'
                }
            },
            {
                name: 'authors',
                title: 'Авторы',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'date',
                title: 'Дата печати',
                type: 'date',
                initialState:  dayjs().format('YYYY-MM-DD'),
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'publisher',
                title: 'Издательство',
                type: 'text',
                initialState: '',
                rules: {
                    required: true
                }
            },
            {
                name: 'page',
                title: 'Количество страниц',
                type: 'number',
                initialState: 0,
                xs: 4,
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'isbn',
                title: 'ISBN',
                type: 'text',
                initialState: '',
            }
        ]
    },
    {
        p_type: 'dissertation',
        title: 'Диссертация',
        fields: [
            {
                name: 'title',
                title: 'Название',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле'
                }
            },
            {
                name: 'authors',
                title: 'Авторы',
                type: 'text',
                initialState: '',
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'date',
                title: 'Дата печати',
                type: 'date',
                initialState:  dayjs().format('YYYY-MM-DD'),
                rules: {
                    required: 'Это обязательное поле',
                }
            },
            {
                name: 'page',
                title: 'Количество страниц',
                type: 'number',
                initialState: 0,
                xs: 12,
                rules: {
                    required: 'Это обязательное поле',
                }
            },
        ]
    },
]