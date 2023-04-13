const customSelect = function(path) {
    const selectBoxes = document.querySelectorAll(path);

    selectBoxes.forEach(select => {
        const parent = select.parentElement,
              options = select.querySelectorAll('option'),
              selectBox = document.createElement('div'),
              selectBoxUl = document.createElement('ul'),
              current = document.createElement('span');

        current.classList.add('current');
        selectBox.classList.add('custom-select__box');
        selectBoxUl.classList.add('list');

        createOptionsList(options, selectBoxUl, current);

        selectBox.append(current);
        selectBox.append(selectBoxUl);
        parent.append(selectBox);

        selectBox.addEventListener('click', (event) => {
            if (selectBox.classList.contains('open')) {
                selectBox.classList.remove('open');
            } else{
                selectBox.classList.add('open');
            }

            if (event.target.classList.contains('option') && !event.target.classList.contains('disabled')) {
                const dataValue = event.target.getAttribute('data-value');

                options.forEach(option => {
                    option.selected = false;

                    if (dataValue === option.value) {
                        option.selected = true;
                    }
                });

                createOptionsList(options, selectBoxUl, current);
            }
        });

        document.addEventListener('click', (event) => {
            if (event.target !== selectBox && event.target !== selectBox && event.target !== current) {
                selectBox.classList.remove('open');
            }
        });
    });


    function createOptionsList(options, parent, current) {
        parent.innerHTML = '';

        options.forEach(option => {

            const newOption = document.createElement('li');

            newOption.classList.add('option');
            newOption.innerHTML = option.innerHTML;
            newOption.setAttribute('data-value', option.value);

            if (option.selected) {
                newOption.classList.add('selected');
                current.innerText = option.innerHTML;
            }

            if (option.disabled) {
                newOption.classList.add('disabled');
            }

            parent.append(newOption);
        });
    }
};

customSelect('.custom-select select');