new Vue({
    el: '#collapse1',
    data: {
        postulanteOk:false,
        postulante:{
            nombres:'',
            dni:'',
            email:'',
            movil:'',
            carreraprofesional:'',
            cargo_id:1
        }
    },
    methods: {
        validatePostulantes: function () {
            for (const prop in this.postulante) {
                if (!this.postulante[prop]) {
                    alert(`el campo ${prop} es requerrido`)
                    this.postulanteOk= false;
                    return false;
                }                
            }
            instance.open(1);
            this.postulanteOk= true;
        }
    },
})