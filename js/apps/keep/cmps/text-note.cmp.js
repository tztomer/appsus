export default {
    template: `
          <section>
            <h3>{{noteInfo.title}}</h3>
            <p>
                {{noteInfo.txt}}
            </p>
          </section>
          `,
    props: ['noteInfo'],
  }