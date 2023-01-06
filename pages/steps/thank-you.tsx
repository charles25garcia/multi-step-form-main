// Sass
import ThankYouStyle from '../../styles/pages/thank-you.module.sass';
import CommonStyle from '../../styles/common.module.sass';

export default function ThankYou(): JSX.Element {
    return <>
        <div className={`container ${ThankYouStyle.thankYouContainer}`}>
            <img src="../icon-thank-you.svg" alt="no image" />
            <br />
            <br />
            <h1 className={CommonStyle.ubuntuBold}>Thank you!</h1>
            <p className={CommonStyle.gray}>
                Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
            </p>
        </div>
    </>
}