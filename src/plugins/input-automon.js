const plugin = {
    install: function (Vue) {
        Vue.directive('input-automon', {
            // When the bound element is inserted into the DOM...
            /**
             * 
             * @param {HTMLElement} el 
             */
            bind: function (el, binding, vnode) {
                //#region do nothing if tag not is input
                let tag = el.tagName || el.nodeName
                if (tag.toLocaleLowerCase() != "input") {
                    return
                }

                var emit = (vnode, name, data) => {
                    var handlers = (vnode.data && vnode.data.on) ||
                        (vnode.componentOptions && vnode.componentOptions.listeners);

                    if (handlers && handlers[name]) {
                        handlers[name].fns(data);
                    }
                }

                // let handler = function (e) {
                //     alert(`input value: ${e.target.value}, oninput: ${e.data}`)
                //     e.target.value = e.target.value
                //     vnode.context.$emit("input", e.target.value)
                //     // vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
                // }
                // el.removeEventListener("input", handler)
                // el.addEventListener('input', handler)

                let interval = Number(binding.value) || 100
                el.dataset.intervalId = setInterval(() => {
                    // vnode.elm.dispatchEvent(new CustomEvent('input'))
                    let lastCharPos = el.value.length - 1
                    const ret = {
                        text: el.value || null,
                        lastChar: el.value[lastCharPos] || null,
                        lastCharPos: lastCharPos
                    }
                    // vnode.context.$emit("myinput", ret)
                    emit(vnode, 'myinput', ret)
                    // vnode.child.$emit('myinput')
                }, interval)
            },
            /**
             * 
             * @param {HTMLElement} el 
             */
            unbind(el) {
                clearInterval(el.dataset.intervalId)
            }
        })
    }
}

export default plugin