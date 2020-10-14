new Vue({
    el: '#app',
    data: {
        postulanteOk: false,
        postulante: {
            nombres: '',
            dni: '',
            email: '',
            movil: '',
            carreraprofesional: '',
            cargo_id: 2
        },
        estudios: {
            gradoMaestria: false,
            egresadoMaestria: false,
            titulo: false,
            bachiller: false
        },
        acreditados: 1,
        expLaboral: 1,
        expLaboralEsp: 1,
        btnSubmit: false,
        cargos: [],
    },
    created() {
        this.getcargos();
    },
    methods: {
        getcargos() {
            fetch('api/cargos')
                .then(response => response.json())
                .then(data => {
                    this.cargos = data
                    var options = ""
                    for (let index = 0; index < this.cargos.length; index++) {
                        const { nombre, id } = this.cargos[index];
                        options += `<option value="${id}"> ${nombre} </option>`;
                    }
                    $('#cargo').html(options);
                    //console.log(this.cargos);
                    //console.log(options);
                   $('select').formSelect();
                });

        },
        validatePostulantes: function () {
            for (const prop in this.postulante) {
                if (!this.postulante[prop]) {
                    M.toast({ html: `el campo ${prop} es requerrido` })
                    this.postulanteOk = false;
                    return false;
                }
            }
            instance.open(1);
            this.postulanteOk = true;
        },
        addacreditaciones: function () {
            let isOk = true
            $('input[name^="acreditacion"]').each(function () {
                if ($(this).val().length == 0) {
                    isOk = false;
                }
            });
            if (isOk) {
                this.acreditados++
            } else {
                M.toast({ html: `Complete los todos campos o de click en "Continuar"` })
            }
        },
        addexpLaboral: function () {
            let isOk = true
            $('input[name^="experienciaLaboral1"]').each(function () {
                if ($(this).val().length == 0) {
                    isOk = false;
                }
            });
            if (isOk) {
                this.expLaboral++
            } else {
                M.toast({ html: `Complete los todos campos o de click en "Continuar"` })
            }
        },
        addexpLaboralEsp: function () {
            let isOk = true
            $('input[name^="experienciaLaboral2"]').each(function () {
                if ($(this).val().length == 0) {
                    isOk = false;
                }
            });
            if (isOk) {
                this.expLaboralEsp++
            } else {
                M.toast({ html: `Complete los todos campos o de click en "Continuar"` })
            }
        },
        collapseAll: function () {
            //$( "#app" ).submit();
            $(".collapsible-header").addClass("active");
            instance.open()
            this.btnSubmit = true
            M.toast({ html: `Verifique sus datos y de click en "Finalizar"` })

        }
    },
})