<template>
    <div class="form-group has-search">
        <span class="bi bi-search form-control-feedback"></span>
        <span class="form-control-feedback-end">
            <span class="badge bg-dark">
            CTRL + /
            </span>
        </span>
        <input type="text" class="form-control" placeholder="Search...">
     </div>
</template>

<script>
export default {
    name: "SearchField",
    // ctrl + / to focus on search field
    mounted() {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key == "/" || e.key == ":") {
                this.$el.querySelector("input").focus();
            }
        });
        // espace to clear search field and unfocus
        document.addEventListener("keydown", (e) => {
            if (e.key == "Escape") {
                this.$el.querySelector("input").value = "";
                this.$el.querySelector("input").blur();
            }
        });
        // clicking anywhere inside has-search will focus on input
        document.addEventListener("click", (e) => {
            if (e.target.closest(".has-search")) {
                this.$el.querySelector("input").focus();
            }
        });
    },
};
</script>

<style scoped lang="scss">

input:focus {
    border:none;
}

.bg-dark {
    background-color: #000000 !important;
}
.has-search:hover, .has-search:focus-within {
    // $primary with opacity of 0.25
    box-shadow: 0 0 0 0.2rem darken($primary, 5%);
    border-radius: 0.25rem;
}
.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    cursor: pointer;
    opacity: 0.5;
}

.has-search .form-control-feedback-end {
    position: absolute;
    z-index: 2;
    display: block;
    width: 4.75rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    cursor: pointer;
    right: 0;
    top: 0;
    font-size: 0.9rem;
    font-style: italic;
    opacity: 0.5;
}
</style>