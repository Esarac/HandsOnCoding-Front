import { Button, Modal as RModal } from "react-bootstrap"
import style from "./modal.module.scss"

interface LessonFormProps {
    show: boolean
    title: string
    onClose: () => void
    children?: React.ReactNode
    buttons?: React.ReactElement<typeof Button>[]
}

export function Modal(props: LessonFormProps) {
    return (
        <RModal
            show={props.show}
            onHide={props.onClose}
            className={style.modal}
            contentClassName={style.modalContent}
            size="lg"
            centered>
            <RModal.Header
                className={style.modalHeader}
                closeVariant="white"
                closeButton>
                <RModal.Title>{props.title}</RModal.Title>
            </RModal.Header>
            <RModal.Body
            className={style.modalBody}
            >
                {props.children}
            </RModal.Body>
            <RModal.Footer
                className={style.modalBody}
            >
                {props.buttons?.map((button, index)=>{
                    return(
                        <div key={index}>
                            {button}
                        </div>
                    )
                })}
            </RModal.Footer>
        </RModal>
    )
}