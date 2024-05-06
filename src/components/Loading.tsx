import { IonSpinner } from '@ionic/react'

function Loading() {
    return (
        <div className="loading">
            <IonSpinner
                color={'success'}
                duration={1200}
                style={{
                    width: '100px',
                    height: '100px',
                }}
                name="circles"
            />
        </div>
    )
}

export default Loading
