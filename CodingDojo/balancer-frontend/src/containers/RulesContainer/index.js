// vendor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// proj
import { GameElements } from '../../components';
import {
    getGameConnectionString,
    getJavaClient,
    getJsClient,
} from '../../utils';
import { book } from '../../routes';
import Rules from '../../styles/images/icons/rules.svg';

// own
import Styles from './styles.module.css';

const BOARD_EXAMPLE = `
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼      ©     ☼
☼#  ╓●    $   ☼
☼☼  ║         ☼
☼☼  ║  ○   ○  ☼
☼☼  ║         ☼
☼☼╔►║☼☼☼☼☼    ☼
☼☼╚═╝☼     ┌ö ☼
☼#   ☼☼☼  ┌┘  ☼
☼☼  ○☼    ˅   ☼
☼☼   ☼☼☼☼#    ☼
☼☼○    ®    ○ ☼
☼☼            ☼
☼☼  $   ○ ●   ☼
☼☼            ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
`;

const { boardExample, mask, highligte, highligteNotes, mb15, mb30 } = Styles;

class RulesContainer extends Component {
    render() {
        const { server, code, email } = this.props;
        const loggedIn = [ server, code, email ].every(Boolean);
        const connectionUrl = loggedIn
            ? getGameConnectionString(server, code, email)
            : void 0;

        const javaClientLink = loggedIn ? (
            <a href={ getJavaClient(server) }>Java</a>
        ) :
            'Java'
        ;
        const jsClientLink = loggedIn ? (
            <a href={ getJsClient(server) }>JavaScript</a>
        ) :
            'JavaScript'
        ;

        return (
            <div className='container'>
                <div className={ mask }>Snake Battle - як грати?</div>
                <div className='content'>
                    <h2 className='title'>У чому суть гри?</h2>
                    <p>
                        Треба написати Бота для змійки, який обіграє інших ботів
                        за очками. Всі грають на одному полі. Змійка може
                        пересуватися по вільним клітинам поля в усі чотири
                        сторони, але не може повертатися у попередню клітину.
                    </p>
                    <p>
                        На своєму шляху Змійка може зустріти камінь, золото,
                        таблетку люті, таблетку польоту, яблуко або іншу Змійку.
                        Якщо Змійка натрапить на камінь - вона зменшується. Якщо
                        Змійка менше двох клітин - вона загине. За золото,
                        яблука, камені, у разі смерті інших Змійок, Ваша Змійка
                        отримає бонусні бали. За свою смерть - штрафні бали.
                        Бали підсумовуються. Змійка може померти від зіткнення з
                        іншою змійкою або камнем. Детальніше в розділі "ПРАВИЛА,
                        БАЛИ, ОСОБЛИВІ ВИПАДКИ І ПІДКАЗКИ".
                    </p>
                    <h2 className='title'>Як почати?</h2>
                    <div className='subTitle'>
                        Завантажте Проект гри для створення Бота:{ ' ' }
                        { javaClientLink } або { jsClientLink }{ ' ' }
                        { !loggedIn &&
                            '(посилання стануть доступні після входу на сайт)' }
                    </div>
                    <p>
                        Пам'ятайте: у процесі написання Бота Вам необхідно
                        піклуватись тільки про логіку переміщень вашого Бота.
                        Всі необхідні допоміжні речі вже зроблені за Вас.
                    </p>
                    <p>
                        Зареєструйтеся скориставшися формою реєстрації Нового
                        гравця. Запам'ятайте зазначені адресу електронної пошти
                        і пароль - вони знадобляться Вам у майбутньому для
                        авторизації на сайті.
                    </p>
                    <p>
                        Далі необхідно приєднатися з коду до сервера через
                        вебсокети. Це Maven проект і підійде він для гри на JVM
                        і JavaScript мовах.
                    </p>
                    <div className='subTitle'>
                        Адреса для підключення до гри на сервері:
                    </div>
                    <div className={ highligte }>
                        { loggedIn ? (
                            <>
                                {connectionUrl}
                                <CopyToClipboard text={ connectionUrl }>
                                    <img
                                        className={ Styles.copyConnection }
                                        src={ Rules }
                                        alt='Скопіювати адрес'
                                    />
                                </CopyToClipboard>
                            </>
                        ) : (
                            <Link to={ book.login }>
                                Потрібно увійти в систему для отримання адресу
                            </Link>
                        ) }
                    </div>
                    <div className={ highligteNotes }>
                        Тут your@email.com - емейл, який ти вказав при
                        реєстрації на сервері, a code - твій security token,
                        його ти можеш скопіювати з цього поля
                    </div>
                    <p>
                        Після підключення клієнт буде регулярно (кожну секунду)
                        отримувати рядок символів із закодованим станом поля.
                        Формат такий.
                        <br />
                        Довжина рядка дорівнює площі поля. Якщо вставити символ
                        розриву рядків кожні sqrt (length (string)) символів, то
                        вийде читабельне зображення поля.
                        <br />
                        Розбір поля у читабельний вигляд теж уже виконано.
                    </p>
                    <div className='subTitle'>
                        Приклад поля у текстовому вигляді:
                    </div>
                    <div className={ highligte }>
                        <pre className={ boardExample }>{ BOARD_EXAMPLE }</pre>
                    </div>
                    <div className='subTitle'>UI зі спрайтів:</div>
                    <GameElements />
                    <p>
                        Гра покрокова, кожну секунду сервер посилає Вашому
                        клієнту (Боту) стан оновленого поля на поточний момент і
                        чекає на відповідь команди герою. За наступну секунду
                        гравець повинен встигнути дати команду герою. Якщо не
                        встиг - Змійка продовжує рух у тому ж напрямі
                        (початковий напрямок - вправо).
                    </p>
                    <p>
                        Команд кілька: UP, DOWN, LEFT, RIGHT - призводять до
                        руху героя у заданому напрямку на 1 клітину; ACT -
                        залишити камінь (якщо вже є з'їдені камені). Камінь
                        залишається на місці хвоста Змійки. За допомогою каменів
                        можна будувати перепони і блокувати суперників. Команди
                        руху можна комбінувати із командою ACT, розділяючи їх
                        через кому - це значить, що за один такт гри буде
                        залишений камінь, а потім рух (LEFT, ACT) або навпаки
                        (ACT, LEFT)
                    </p>
                    <p>
                        Ваше завдання - змусити вашу Змійку слідувати
                        придуманому алгоритму. Алгоритм Змійки повинен блокувати
                        (і тим самим знищувати) Змійок суперників,
                        використовуючи бонуси елементи. Основне завдання - вести
                        осмислену гру і перемогти, набравши найбільшу кількість
                        балів.
                    </p>
                    <h2 className={ classnames('title', mb15) }>
                        Правила, бали, особливі випадки і підказки
                    </h2>
                    <div className={ classnames('subTitle', mb30) }>
                        Раунди/матчі:
                    </div>
                    <p>
                        Матч складається з 1 Раунду.
                        <br />
                        Учасник, який закінчив гру, одразу попадає до нової
                        кімнати.
                        <br />
                        В новій Кімнаті гра починається після того, як в ній
                        зберуться 5 Учасників.
                        <br />
                        Перемагає змійка, яка залишилася живою на полі, в той
                        час як інші загинули.
                        <br />
                        (не реалізовано) Грає триває 300 тіків і закінчується
                        перемогою найбільшої змійки.
                        <br />
                        Переможець Раунду отримує +50 очків.
                        <br />
                        (не реалізовано) У випадку, якщо на кінець таймауту в
                        300 тіків в кімнаті знаходяться декілька змійок, всі
                        вони вважаються переможцями, але призові очки діляться
                        пропорційно довжинам змійок.
                    </p>
                    <div className={ classnames('subTitle', mb30) }>
                        Штрафні бали:
                    </div>
                    <p>
                        Змійка, яка врізалась у стіну, гине.
                        <br />
                        Змійка, яка врізалась в іншу Змійку, гине.
                        <br />
                        Змійка повинна бути не менше 2-х клітин довжиною, інакше
                        вона гине.
                        <br />
                        Змійка, яка з'їла камінь, коротшає на 3 клітини і гине,
                        якщо стає менше 2 клітин довжиною.
                    </p>
                    <div className={ classnames('subTitle', mb30) }>
                        Додаткові бали:
                    </div>
                    <p>
                        Змійка, яка з'їла яблуко, збільшується на 1 клітину і
                        отримує +1 очко.
                        <br />
                        Змійка, яка з'їла таблетку польоту, протягом 10 ходів
                        літає над камінням та іншими Змійками.
                        <br />
                        Змійка, яка з'їла таблетку люті, протягом 10 ходів може
                        відкушувати шматки від інших Змійок, а також їсти камені
                        без зменшення довжини.
                        <br />
                        Змійка, яка відкусила чужий хвіст і при цьому не
                        загинула, отримує +10 за кожну частину довжини змійки,
                        яку вона вкусила.
                        <br />
                        Змійка, яка з'їла золото, отримує 5 додаткових очків.
                        <br />
                        Змейка, яка з'їла камінь і не загинула, отримує +10.
                        <br />
                    </p>
                    <div className={ classnames('subTitle', mb30) }>
                        Особливі випадки:
                    </div>
                    <p>
                        Змійкам дозволено відкушувати свій власний хвіст. При
                        цьому довжина змії зменшується, більше ніяких наслідків.
                        <br />
                        При зіткненні Змійок лоб у лоб, менша Змійка гине.
                        Велика Змійка при цьому коротшає на довжину меншої і
                        гине, якщо стає менше 2 клітин довжиною.
                        <br />
                        При зіткненні двох Змійок, одна з яких під впливом
                        таблетки польоту, не відбувається нічого.
                        <br />
                        При зіткненні двох Змійок завжди перемагає Змійка, яка
                        перебуває під впливом таблетки люті.
                        <br />
                        Якщо змійка не знаходиться під впливом таблеток, то,
                        незалежно від її довжини, зіткнувшися з суперником, вона
                        гине. У випадку дії таблетки люті в момент зіткнення з
                        тілом суперника змійка, що атакує, відкушує хвіст
                        жертви.
                        <br />
                        При зіткненні двох Змійок, коли обидві під впливом
                        таблетки люті, діють звичайні правила зіткнень - як при
                        зіткненні змійок лоб в лоб без таблеток-модифікаторів.
                        <br />
                    </p>
                    <div className={ classnames('subTitle', mb30) }>
                        Підказки:
                    </div>
                    <p>
                        Якщо Ви не знаєте, що написати, спробуйте реалізувати
                        наступні варіанти алгоритмів:
                        <br />
                    </p>
                    <ul>
                        <li>
                            - Переміщення у випадкову сторону, якщо відповідна
                            клітина вільна.
                        </li>
                        <li>
                            - Рух на вільну клітину в бік найближчого яблука.
                        </li>
                        <li>
                            - Рух до того яблуку, дістатися до якого можна
                            швидше за інших Учасників.
                        </li>
                        <li>
                            - Ухилення від довших суперників і від суперників у
                            стані люті.
                        </li>
                        <li>
                            - Блокування собою передбачуваних маршрутів
                            суперника.
                        </li>
                    </ul>
                    <div className={ classnames('subTitle', mb30) }>
                        Як визначатимуться переможці?
                    </div>
                    <ol>
                        <li>
                            1. Змагання проходитимуть у Кімнатах по декілька
                            Участників на одному Полі.
                        </li>
                        <li>
                            2. Кожна Кімната грає декалька Раудів. Один Раунд
                            триватиме доти, доки не залишиться тільки одна
                            Змійка на Полі.
                        </li>
                        <li>
                            3. Після серії із кількох Раудів у одній Кімнаті,
                            Кімнату Участникові буде змінено автоматично на іншу
                            на Кімнату із іншим складом Участників.
                        </li>
                        <li>
                            4. Вигляд Поля може бути змінено від Матчу до Матчу.
                        </li>
                        <li>
                            5. За один Iгровий День з 9:00 до 19:00 кожен
                            Участник матиме можливість заробити певну кількість
                            Балів, які сумуються впродовж всіх Матчів/Раудів за
                            цей проміжок часу.
                        </li>
                        <li>
                            6. Переможцями Ігрового Дня вважаються 10 Ботів
                            Участників за результатами всіх Раундів Ігрового Дня
                            на день та годину закриття Ігового Дня.
                        </li>
                        <li>
                            7. Тільки Участники, які набрали більше 0 Балів
                            протягом Ігрового Дня можуть стати Переможцями
                            Ігрового Дня.
                        </li>
                        <li>
                            8. Якщо на останнє місце (10-те) будуть претендувати
                            більше ніж один Участник (отримано однакову
                            кількість Балів) - всі вони обираються Переможцями
                            цього Iгрового Дня.
                        </li>
                        <li>
                            9. Переможці кожного дня автоматично попадають до
                            Фіналу, який відбудеться останнього дня Конкурсу
                            (14.02.2019).
                        </li>
                        <li>
                            10. Участники, що не потрапили до списку Переможців
                            у будь-який день Конкурсу до Фіналу, мають
                            можливість вдосконалити свого Бота і спробувати
                            потрапити до списку Фіналістів у будь-який інший
                            Ігровий День до Фіналу, тобто до 13.02.2019 включно.
                        </li>
                        <li>
                            11. Фінал Конкурсу проходитиме подібно до Ігрового
                            Дня із такими відмінностями:
                        </li>
                        <li>
                            11.1 Перша частина Фіналу триватиме 14.02.2019 з
                            9:00 до 17:00, після чого буде обрано 10 кращих
                            Ботів Участників за результатами всіх Раундів цієї
                            частини Фіналу - Суперфіналісти.
                        </li>
                        <li>
                            11.2 Суперфінал триватиме 14.02.2019 з 18:00 до
                            19:00 у формі серії Раундів серед Суперфіналістів.
                        </li>
                    </ol>
                    <p>
                        { ' ' }
                        Із детальним описом Правил і Положень гри можна
                        ознайомитися за &nbsp;
                        <Link to={ book.privacyRules }>
                            посиланням <img src={ Rules } alt='rules' />
                        </Link>
                        .
                    </p>
                    <p>
                        У разі будь-яких питань звертайтеся за електронною
                        адресою &nbsp;
                        <a href='mailto:codenjoyme@gmail.com'>
                            codenjoyme@gmail.com
                        </a>
                    </p>
                    <p>
                        Для спілкування між Участниками та Організатором також
                        створено Канал у додатку Slack, приєднатися до якого
                        можна за &nbsp;
                        <a
                            href={ process.env.REACT_APP_JOIN_CHAT_LINK }
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            посиланням <img src={ Rules } alt='rules' />
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    email:  state.auth.email,
    server: state.auth.server,
    code:   state.auth.code,
});

export default connect(
    mapStateToProps,
    null,
)(RulesContainer);
