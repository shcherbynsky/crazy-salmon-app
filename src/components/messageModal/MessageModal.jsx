import React from 'react'

function MessageModal({isModalShown, setIsModalShown, status, messageOk, MessageError}) {

    const modalLayoutRef = React.useRef()
    const modalCloseButtonRef = React.useRef()
    React.useEffect(() => {
        const body = document.getElementsByTagName("body")[0]
        body.classList.add('_lock')
        const handleClickOutsideModal = (e) => {

            if (modalLayoutRef.current === e.target || e.composedPath().includes(modalCloseButtonRef.current)) {
                setIsModalShown(false)
                body.classList.remove('_lock')
                if (status) {
                    navigate('/')
                }
            }

        }
        document.addEventListener('click', handleClickOutsideModal)

        return () => {
            document.removeEventListener('click', handleClickOutsideModal)
        }
    }, [])


    return (
        <div className={"modalmessage" + (isModalShown ? " _active" : "")}>
            <div ref={modalLayoutRef} className="modalmessage__layout">
                <div className="modalmessage__body">
                    <div className="modalmessage__content">
                        <p className="modalmessage__title">{status ? 'Дякуємо!' : 'Помилка('}</p>
                        <p className="modalmessage__message">{status ? messageOk : MessageError}</p>
                    </div>
                    <div ref={modalCloseButtonRef} className="modalmessage__button btn__long">Закрити</div>
                </div>
            </div>
        </div>
    )
}

export default MessageModal