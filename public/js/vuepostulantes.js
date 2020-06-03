new Vue({
    el: '#app',
    data: {
        postulanteOk:false,
        postulante:{
            nombres:'',
            dni:'',
            email:'',
            movil:'',
            carreraprofesional:'',
            cargo_id:1
        },
        estudios:{
            gradoMaestria:false,
            egresadoMaestria:false,
            titulo:false,
            bachiller:false
        },
        acreditados:1,
        expLaboral:1,
        expLaboralEsp:1,
        btnSubmit:false
    },
    methods: {
        validatePostulantes: function () {
            for (const prop in this.postulante) {
                if (!this.postulante[prop]) {
                    M.toast({html: `el campo ${prop} es requerrido`})
                    this.postulanteOk= false;
                    return false;
                }                
            }
            instance.open(1);
            this.postulanteOk= true;
        },
        collapseAll:function(){
            //$( "#app" ).submit();
            $(".collapsible-header").addClass("active"); 
            instance.open()
            this.btnSubmit=true
            M.toast({html: `Verifique sus datos y de click en "Finalizar"`})

        }
    },
})