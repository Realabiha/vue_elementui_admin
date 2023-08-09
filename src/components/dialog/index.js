import './index.scss'
export default {
    name: 'Dialog',
    functional: true,
    render(_, context) {
        const test = function () {
            console.log('click')

            context.parent.show = false
        }

        // console.log(context)
        const { title, content } = context.props
        const { value: show } = context.data.model
        const { input } = context.listeners
        return show ? <div vOn: click={test}>
            <h1>{title}</h1>
            <p>{content}</p>
        </div> : ''
    },
}