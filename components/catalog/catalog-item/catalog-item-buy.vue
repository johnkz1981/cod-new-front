<catalog-item-buy id="catalog-item-buy">

</catalog-item-buy>
<script>
  export default {
    props: {
      minQuantity: {
        type: Number,
        required: true
      },
      maxQuantity: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        quantity: this.minQuantity,
        packageType: 1,
        packageTypes: [
          { id: 1, text: 'Шт', fullText: 'Штук'},
          { id: 2, text: 'Уп', fullText: 'Упаковок'},
          { id: 3, text: 'Кор', fullText: 'Коробок'}
        ]
      };
    },
    methods: {
      add () {
        this.$emit('on-buy');
      },
    }
  }
</script>