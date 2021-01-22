NORTH_SOUTH = ['n', 's']
BLACK = True
WHITE = False
E = 'e'
SE = 'se'
SW = 'sw'
W = 'w'
NW = 'nw'
NE = 'ne'
HEX_COMPASS = {
    #   ( Y,  X)
    E:   (0,  1),
    SE:  (1,  1),
    SW:  (1,  0),
    W:   (0, -1),
    NW: (-1, -1),
    NE: (-1,  0)
}


def get_flip_list(data):
    tiles_list = []
    for line in data:
        line = line.strip()
        tile_position = []
        while line:
            if line[0] in NORTH_SOUTH:
                tile_position.append(line[:2])
                line = line[2:]
            else:
                tile_position.append(line[:1])
                line = line[1:]
        tiles_list.append(tile_position)

    return tiles_list


# PART 1
def lobby_layout(data):
    flip_list = get_flip_list(data)
    max_instructions = max([len(it) for it in flip_list])*2 + 101  # 100 wiggle room for the 100 days lobby
    grid = [[WHITE for i in range(max_instructions)] for _ in range(max_instructions)]
    for flip_instructions in flip_list:
        x = y = max_instructions // 2
        location = (y, x)  # REFERENCE TILE
        for instr in flip_instructions:
            location = tuple(prev + step for prev, step in zip(location, HEX_COMPASS[instr]))
        grid[location[0]][location[1]] = not grid[location[0]][location[1]]  # flip color

    return grid, sum([sum(y) for y in grid])


# PART 2
def lobby_in_time(grid, day_limit=100):
    day = 0
    while day < day_limit:
        temp_grid = [[WHITE for col in row] for row in grid]
        for y, y_col in enumerate(grid):
            for x, tile in enumerate(y_col):
                neighbors = count_neighbors(y, x, grid)
                if tile == BLACK and (neighbors == 0 or neighbors > 2):
                    temp_grid[y][x] = WHITE
                elif tile == WHITE and neighbors == 2:
                    temp_grid[y][x] = BLACK
                else:
                    temp_grid[y][x] = tile
        grid = temp_grid
        day += 1
        print(f'processed day {day}', end='\r')

    print('\n')
    return sum([sum(y) for y in grid])


def count_neighbors(y, x, grid):
    ctr = 0
    for neighbor in HEX_COMPASS.values():
        location = [prev + step for prev, step in zip((y, x), neighbor)]
        try:
            if grid[location[0]][location[1]]:
                ctr += 1
        except IndexError:
            pass

    return ctr


def main():
    data = list(open('input.txt', 'r'))
    print('Part ONE')
    grid, grid_sum = lobby_layout(data)
    print(f'{grid_sum}')

    print('Part TWO')
    print(f'{lobby_in_time(grid, 100)}')


if __name__ == "__main__":
    main()
