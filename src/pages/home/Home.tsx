import styles from './Home.module.scss';
import IMGCoreanos from '../../assets/img/coreanos.png';
import IMGExcelsius from '../../assets/img/excelsior.png';
import IMGDos from '../../assets/img/dos.png';
import IMGBvv from '../../assets/img/bvv.png';
import IMGAdo from '../../assets/img/ado.png';
import IMGRunning from '../../assets/img/running.png';
import IMGCountry from '../../assets/img/country.png';
import IMGCity from '../../assets/img/city.png';
import IMGArrowsearch from '../../assets/img/arrowSearch.png';
const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.containerBackgroundFundo}>
        <div className={styles.imgBackground}>
        <div className={styles.containerSearchAndTimes}>
          <div className={styles.times}>
            <img className={styles.img} src={IMGCoreanos} alt="Coreanos" />
            <img className={styles.img} src={IMGExcelsius} alt="Excelsius" />
            <img className={styles.img} src={IMGDos} alt="Dos" />
            <img className={styles.img} src={IMGBvv} alt="Bvv" />
            <img className={styles.img} src={IMGAdo} alt="Ado" />
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.selectsContainer}>
              <label className={styles.label}>
                <span className={styles.span}>
                  <img src={IMGRunning} alt="running ico" /> Sport
                </span>
                <select className={styles.select}>
                  <option value="0">Select a sport</option>
                </select>
              </label>
              <label className={styles.label}>
                <span className={styles.span}>
                  <img src={IMGCountry} alt="country ico" /> Country
                </span>
                <select className={styles.select}>
                  <option value="0">Select a country</option>
                </select>
              </label>
              <label className={styles.label}>
                <span className={styles.span}>
                  <img src={IMGCity} alt="city ico" /> City
                </span>
                <select className={styles.select}>
                  <option value="0">Select a City</option>
                </select>
              </label>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>
                Search <img src={IMGArrowsearch} alt="Search arrow" />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
