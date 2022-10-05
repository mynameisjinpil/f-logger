import {LogLevel} from './interface/LogLevel';
import Storage from './Storage';

export default class Log {
  tag?: string;
  printLevel: LogLevel = LogLevel.DEBUG;
  saveLevel: LogLevel = LogLevel.WRITE;
  storage = Storage.getInstance();

  configure({
    tag,
    printLevel,
    saveLevel,
  }: {
    tag: string;
    printLevel: LogLevel;
    saveLevel: LogLevel;
  }) {
    this.tag = tag;
    this.printLevel = printLevel;
    this.saveLevel = saveLevel;
  }

  d(message: string) {
    const log = `[${this.tag}] ${new Date()} - ${message}`;

    this.saveLevel >= LogLevel.DEBUG && this.storage.save(log);
    this.printLevel >= LogLevel.DEBUG && console.debug(log);
  }

  i(message: string) {
    const log = `[${this.tag}] ${new Date()} - ${message}`;
    this.saveLevel >= LogLevel.INFO && this.storage.save(log);
    this.printLevel >= LogLevel.INFO && console.info(log);
  }

  w(message: string) {
    const log = `[${this.tag}] ${new Date()} - ${message}`;

    this.saveLevel >= LogLevel.WARN && this.storage.save(log);
    this.printLevel >= LogLevel.WARN && console.warn(log);
  }

  e(message: string) {
    const log = `[${this.tag}] ${new Date()} - ${message}`;

    this.saveLevel >= LogLevel.ERROR && this.storage.save(log);
    this.printLevel >= LogLevel.ERROR && console.error(log);
  }

  wr(message: string) {
    const log = `[${this.tag}] ${new Date()} - ${message}`;
    this.saveLevel >= LogLevel.WRITE && this.storage.save(log);
  }

  private static instance: Log;

  static getInstance(): Log {
    if (!Log.instance) {
      Log.instance = new Log();
    }
    return Log.instance;
  }
}

/**
 * console 관련 함수
 *
 *
 *
 * 1. 출력
 *
 * console.log()
 * 일반 메시지를 출력합니다. 추가 매개변수와 함께 문자열 치환을 사용할 수 있습니다.
 *
 * console.debug()
 * debug 중요도로 메시지를 출력합니다.
 *
 * console.info() (en-US)
 * 정보 메시지를 출력합니다. 추가 매개변수와 함께 문자열 치환을 사용할 수 있습니다.
 *
 * console.warn()
 * 경고 메시지를 출력합니다. 추가 매개변수와 함께 문자열 치환을 사용할 수 있습니다.
 *
 * console.error()
 * 오류 메시지를 출력합니다. 추가 매개변수와 함께 문자열 치환을 사용할 수 있습니다.
 *
 * console.exception() Non-standard Deprecated
 * error()의 별칭입니다.
 *
 *
 * 2. 들여쓰기
 *
 * console.group()
 * 새로운 인라인 그룹을 생성해, 이후 모든 출력을 한 단계 들여씁니다. 그룹을 나오려면 groupEnd()를 호출하세요.
 *
 * console.groupCollapsed()
 * 새로운 인라인 그룹을 생성해, 이후 모든 출력을 한 단계 들여씁니다. 그러나 group()과 달리, groupCollapsed()로 생성한 그룹은 처음에 접혀 있습니다. 그룹을 나오려면 groupEnd()를 호출하세요.
 *
 * console.groupEnd()
 * 현재 인라인 그룹을 나옵니다.
 *
 * console.table() (en-US)
 * 표 형태의 데이터를 표에 그립니다.
 *
 *
 * 3. 성능 분석
 *
 * console.profile() (en-US)
 * 브라우저의 내장 프로파일러(Firefox 성능 측정 도구 등)를 실행합니다. 선택 사항으로 프로파일에 이름을 붙일 수 있습니다.
 *
 * console.profileEnd() (en-US)
 * 프로파일러를 멈춥니다. 프로파일 결과는 브라우저의 성능 측정 도구(Firefox 성능 측정 도구 등)에서 확인할 수 있습니다.
 * console.assert()
 * 첫 번째 매개변수가 false인 경우 메시지와 스택 추적을 출력합니다.
 *
 * 4. 시간
 *
 * console.time()
 * 주어진 이름의 타이머를 실행합니다. 하나의 페이지에서는 최대 10,000개의 타이머를 동시에 실행할 수 있습니다.
 *
 * console.timeEnd()
 * 지정한 타이머를 멈추고, 소요시간을 출력합니다.
 *
 * console.timeStamp() (en-US) Non-standard
 * 브라우저의 타임라인이나 워터폴 (en-US)에 마커를 추가합니다.
 *
 *
 * 5. 기타
 *
 * console.clear()
 * 콘솔의 내용을 지웁니다.
 *
 * console.count()
 * 주어진 레이블로 메서드를 호출한 횟수를 출력합니다.
 *
 * console.countReset()
 * 주어진 라벨의 횟수를 초기화합니다.
 *
 * console.dir() (en-US)
 * 주어진 JavaScript 객체의 속성 목록을 상호작용 가능한 형태로 표시합니다. 속성 값이 다른 객체라면 펼쳐서 살펴볼 수 있습니다.
 *
 * console.dirxml() (en-US)
 * 객체를 XML/HTML 요소 형태로 나타낼 수 있으면 그렇게 표시하고, 아닐 경우 JavaScript 객체 형태로 표시합니다.
 *
 * console.trace()
 * 스택 추적을 출력합니다.
 *
 * */
