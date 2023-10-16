// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

    const tableSlides = document.querySelectorAll('.table-slide')
    tableSlides.forEach((item)=>{
        
        item.addEventListener('click',(e)=>{
            console.log(item)
            const dropDownArrow = item.querySelector('.dropdown-table')
            const animateList = item.querySelector('.animate-list')
            const currentState = dropDownArrow.getAttribute('data-open')
            const toggle = currentState === 'false' ? 'true' : 'false'
            console.log(toggle)
            animateList.setAttribute('data-open', toggle)
            dropDownArrow.setAttribute('data-open', toggle)
        })
    })


    const swiper = new Swiper('.swiper', {
        // Optional parameters
        slidesPerView: 1,
        direction: 'horizontal',


        // If we need pagination
        pagination: {
            el: '.swiper-dots',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-btn-nxt',
            prevEl: '.swiper-btn-prev',
        },


    });

})
