from ..model import Publication, Article, Thesis, Monograph


class PublicationFactory:
    """
    Factory for publications
    """
    @staticmethod
    def get_publication(publication_type, fields: dict):
        match publication_type:
            case "article":
                fields = Article.check_args(**fields)
                return Article(**fields)
            case "thesis":
                fields = Thesis.check_args(**fields)
                return Thesis(**fields)
            case "monograph":
                fields = Monograph.check_args(**fields)
                return Monograph(**fields)
            case "publication":
                return Publication(**fields)
            case _:
                raise Exception("Publication type not found")

    @staticmethod
    def get_publication_cls(publication_type):
        match publication_type:
            case "article":
                return Article
            case "thesis":
                return Thesis
            case "monograph":
                return Monograph
            case "publication":
                return Publication
            case _:
                raise Exception("Publication type not found")
